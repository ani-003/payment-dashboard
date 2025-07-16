import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';


export default function TaskCard({ title, data, height, width, size, descfontSize, bgcolor, textcolor }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: bgcolor,
          height: height,
          width: width,
          shadowColor: theme.dark ? '#000' : '#aaa',
        },
      ]}
    >
      <Text style={[styles.title, { color: textcolor, fontSize: size }]}>
        {title}
      </Text>
      <Text style={{ color: textcolor, fontSize: descfontSize}}>
        {data}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
card: {
  borderRadius: 16,
  padding: 16,
  justifyContent: 'space-between',


  shadowColor: '#000',
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 20,
  elevation: 5,
},

  title: {

    fontFamily: 'Poppins_600SemiBold',
  },
});
