
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme, Surface } from 'react-native-paper';
import TopMenu from '../../components/allScreens/TopMenu';
export default function AboutSection() {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    
    <View style={{ flex: 1, alignItems: 'center', marginBottom: 20 }}>
      <TopMenu onProfilePress={() => console.log('Profile pressed')} />
    
    </View>
      <Surface style={[styles.container, { backgroundColor: theme.colors.surface }]}>
        <Text variant="titleLarge" style={styles.heading}>
          About This Project
        </Text>

        <Text style={styles.text}>
          This is a <Text style={styles.bold}>Full-Stack Payment Dashboard App</Text> developed as part of a technical internship assignment. The application allows users to view, filter, and manage payment transactions through a responsive mobile interface. The primary goal of this project is to demonstrate secure authentication, dynamic data handling, and real-time filtering of transaction records.
        </Text>

        <Text style={styles.subheading}>Key Features:</Text>
        <Text style={styles.text}>• Secure login using JWT</Text>
        <Text style={styles.text}>• Paginated & filtered transaction list</Text>
        <Text style={styles.text}>• Filter modal (date, amount, status, method)</Text>
        <Text style={styles.text}>• Add payment with validation & auto-refresh</Text>

        <Text style={styles.subheading}>Tech Stack:</Text>

        <Text style={styles.bold}>Frontend:</Text>
        <Text style={styles.text}>• React Native (Expo)</Text>
        <Text style={styles.text}>• React Native Paper</Text>
        <Text style={styles.text}>• Axios</Text>
        <Text style={styles.text}>• React Navigation</Text>

        <Text style={styles.bold}>Backend:</Text>
        <Text style={styles.text}>• NestJS (REST API)</Text>
        <Text style={styles.text}>• MongoDB with Mongoose</Text>
        <Text style={styles.text}>• JWT Authentication</Text>
        <Text style={styles.text}>• Filtering, pagination, statistics API</Text>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  container: {
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },
  heading: {
    marginBottom: 12,
    fontWeight: 'bold',
    fontFamily: 'Poppins_700Bold',
  },
  subheading: {
    marginTop: 16,
    marginBottom: 4,
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Poppins_400Regular',
  },
  bold: {
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
});
