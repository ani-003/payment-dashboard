import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ userName }) {
  const [currentTime, setCurrentTime] = useState('');
  const theme = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;
      setCurrentTime(formattedTime);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning.';
    if (hour < 17) return 'Good Afternoon.';
    return 'Good Evening.';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View>
        <Text style={[styles.greeting, { color: theme.colors.onSurface }]}>Hi, {userName}</Text>
        <Text style={styles.subtext}>{getGreeting()}</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={[styles.time, { color: theme.colors.onSurface }]}>{currentTime}</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  greeting: {
    fontSize: 22,
    fontFamily: 'Poppins_600SemiBold',

  },
  subtext: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
    color: '#666',
  },
});
