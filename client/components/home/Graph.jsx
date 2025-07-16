import React, { useEffect, useState } from 'react';
import { Dimensions, View, ActivityIndicator, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from 'react-native-paper';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

export default function Graph() {
  const theme = useTheme();
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://192.168.10.2:5000/payments/stats');
      const breakdown = res.data.dailyRevenueBreakdown || [];

      const labels = breakdown.map(item =>
        new Date(item.date).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
        })
      );

      const values = breakdown.map(item => item.revenue);

      setChartData({
        labels,
        datasets: [
          {
            data: values,
            strokeWidth: 2,
            color: (opacity = 1) =>
              theme.colors.secondary
          },
        ],
      });
    } catch (error) {
      console.error('Failed to fetch chart data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const chartConfig = {
    backgroundColor: theme.colors.background,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.background,
    decimalPlaces: 0,
  
      color: () => theme.colors.outline, // purple

    labelColor: () => theme.colors.onSurface,
    style: {
      borderRadius: 8
    },
    propsForDots: {
      r: '3',
      strokeWidth: '2',
      stroke: theme.colors.primary,
    },
  };

  return (
    <View style={{marginHorizontal: 16, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : chartData ? (
        <LineChart
          data={chartData}
          width={screenWidth - 60}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{ borderRadius: 12 }}
        />
      ) : (
        <Text style={{ color: theme.colors.onSurface }}>No chart data available</Text>
      )}
    </View>
  );
}
