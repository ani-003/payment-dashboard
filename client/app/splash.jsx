import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Text, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import useAuthStore from '../src/store/authStore';

const imgLight = require('../assets/images/logo-light.png');
const imgDark = require('../assets/images/logo-dark.png');
const { width } = Dimensions.get('window');

export default function Splash() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const { user } = useAuthStore();
  const theme = useTheme();

  const img = theme.dark ? imgDark : imgLight;

  useEffect(() => {
    // Animate
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const checkLoginStatus = async () => {
      await useAuthStore.getState().loadUserFromStorage();
      const user = useAuthStore.getState().user;

      setTimeout(() => {
        if (user) {
          router.replace('/(tabs)/home');
        } else {
          router.replace('/(auth)/signup');
        }
      }, 2000);
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.Image
        source={img}
        style={[styles.logo, { opacity: fadeAnim }, {backgroundColor: theme.colors.surface }]}
        resizeMode="contain"
     
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
logo: {
  width: width * 0.9,         // 90% of screen width
  height: width * 0.9,        // match height
 
  backgroundColor: '#f0f0f0',
  borderRadius: 24,

},

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
