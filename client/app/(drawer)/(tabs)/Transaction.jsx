import { useLocalSearchParams, useRouter, useNavigation, useFocusEffect } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopMenu from '../../../components/allScreens/TopMenu';
import TransactionList from '../../../components/transactions/TransactionList';
import FilterModal from '../../../components/transactions/FilterModal';
import useAuthStore from '../../../src/store/authStore';

export default function TabTwoScreen() {
  const theme = useTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const { refresh } = useLocalSearchParams(); // ✅ use expo-router's hook

  const [showFilter, setShowFilter] = useState(false);
  const [apiURL, setApiURL] = useState('http://192.168.10.2:5000/payments');
  const [refreshFlag, setRefreshFlag] = useState(0);

  const handleApplyFilters = (url) => {
    setApiURL(url);
  };

  useFocusEffect(
    useCallback(() => {
      if (refresh === 'true') {
        setRefreshFlag((prev) => prev + 1);
        // Optionally clear the search param
        router.replace('/(tabs)/tabTwo'); // replace with your tab route to reset the URL
      }
    }, [refresh])
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TopMenu onProfilePress={() => console.log('Profile pressed')} />
      <View style={{ width: '100%', paddingHorizontal: 10 }}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>TRANSACTIONS</Text>
      </View>

      <TransactionList url={apiURL} refreshFlag={refreshFlag} />

      <FilterModal
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={handleApplyFilters}
      />

      <View style={styles.filterButtonWrapper}>
        <TouchableOpacity onPress={() => setShowFilter(true)} style={styles.filterButton}>
          <Ionicons name="filter" size={24} color={theme.colors.primary} />
          <Text style={{ color: theme.colors.primary, marginLeft: 5 }}>Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginVertical: 20,
    fontFamily: 'Poppins_700Bold',
  },
  filterButtonWrapper: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
