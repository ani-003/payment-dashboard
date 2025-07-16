import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from 'expo-router';

export default function AddPaymentButton() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.button, { backgroundColor: theme.colors.primary }]}
      onPress={() => navigation.navigate('AddPaymentScreen')} 
    >
      <Text style={[styles.text, { color: theme.colors.onPrimary }]}>Add Payment</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    elevation: 2,
    width: '85%',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
});
