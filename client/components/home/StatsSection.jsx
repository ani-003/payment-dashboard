import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';
import axios from 'axios';

import TaskCard from './TaskCard';
import Animated, { useSharedValue } from 'react-native-reanimated';
import FlipCard from './FlippableCard';

export default function StatsSection() {
  const theme = useTheme();
  const isFlipped = useSharedValue(false);

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalPaymentsToday: 0,
    totalPaymentsThisWeek: 0,
    failedTransactions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://192.168.10.2:5000/payments/stats');
        const data = res.data;
        setStats({
          totalRevenue: data.totalRevenue || 0,
          totalPaymentsToday: data.totalPaymentsToday || 0,
          totalPaymentsThisWeek: data.totalPaymentsThisWeek || 0,
          failedTransactions: data.failedTransactions || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <TaskCard
          title="Revenue"
          data={`₹${stats.totalRevenue}`}
          height={200}
          width={160}
          size={22}
          descfontSize={20}
          bgcolor={theme.colors.surface}
          textcolor={theme.colors.onSurface}
        />

        <View style={styles.col}>
          <Pressable onPress={() => (isFlipped.value = !isFlipped.value)}>
            <FlipCard
              isFlipped={isFlipped}
              frontContent={
                <View style={[styles.face, { width: 150, height: 95 }]}>
                  <TaskCard
                    title="Total Payments Today"
                    data={stats.totalPaymentsToday.toString()}
                    height={95}
                    width={150}
                    size={13}
                    descfontSize={15}
                    bgcolor={theme.colors.highlight}
                    textcolor={theme.colors.onSurface}
                  />
                </View>
              }
              backContent={
                <View style={[styles.face, { width: 150, height: 95 }]}>
                  <TaskCard
                    title="Payments This Week"
                    data={stats.totalPaymentsThisWeek.toString()}
                    height={95}
                    width={150}
                    size={13}
                    descfontSize={15}
                    bgcolor={theme.colors.highlight}
                    textcolor={theme.colors.onSurface}
                  />
                </View>
              }
              style={styles.card}
            />
          </Pressable>

          <TaskCard
            title="Failed Transactions"
            data={stats.failedTransactions.toString()}
            height={95}
            width={150}
            size={13}
            descfontSize={15}
            bgcolor={theme.colors.surface}
            textcolor={theme.colors.onSurface}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginLeft: 10,
  },
  col: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    width: 160,
    height: 95,
  },
  face: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
