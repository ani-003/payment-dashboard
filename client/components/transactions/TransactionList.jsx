import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import TransactionCard from './TransactionCard';

export default function TransactionList({ url, refreshFlag }) {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchPayments = useCallback(
    async (pageNum = 1, reset = false) => {
      if (loading || (!hasMore && !reset)) return;

      setLoading(true);

      try {
        const pagedURL = url.includes('?')
          ? `${url}&page=${pageNum}&limit=10`
          : `${url}?page=${pageNum}&limit=10`;

        const res = await axios.get(pagedURL);
        const { data, total, limit } = res.data;

        if (Array.isArray(data)) {
          setTransactions(prev => {
            if (reset) return data;

            const existingIds = new Set(prev.map(item => item._id));
            const newItems = data.filter(item => !existingIds.has(item._id));
            return [...prev, ...newItems];
          });

          const totalFetched = (pageNum - 1) * limit + data.length;
          if (totalFetched >= total) {
            setHasMore(false);
          } else {
            setPage(prev => prev + 1);
          }
        } else {
          console.warn('Unexpected response format:', res.data);
          setHasMore(false);
        }
      } catch (error) {
        console.error('❌ Error fetching payments:', error.message);
      } finally {
        setLoading(false);
      }
    },
    [url, loading, hasMore]
  );

  // ✅ Fetch on URL change
useEffect(() => {
  setTransactions([]);
  setPage(1);
  setHasMore(true);
  fetchPayments(1, true);
}, [url, refreshFlag]);


  const renderItem = ({ item }) => <TransactionCard data={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={item => item._id.toString()}
        renderItem={renderItem}
        onEndReached={() => fetchPayments(page)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" style={styles.loader} /> : null
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  loader: {
    padding: 16,
  },
});
