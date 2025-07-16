import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import axios from 'axios';
import { useNavigation, router } from 'expo-router';
import TopMenu from '../../components/allScreens/TopMenu'

export default function AddPaymentScreen() {
  const theme = useTheme();
  const navigation = useNavigation();


  const [form, setForm] = useState({
    amount: '',
    receiver: '',
    method: '',
    status: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.amount || !form.receiver || !form.method || !form.status) {
      Alert.alert('Validation', 'Please fill out all fields.');
      return;
    }

    try {
      const res = await axios.post('http://192.168.10.2:5000/payments', form);
      Alert.alert('Success', 'Payment added!');
      setForm({
        amount: '',
        receiver: '',
        method: '',
        status: '',
      });

  



      navigation.goBack();

    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong!');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>



      <TopMenu onProfilePress={() => console.log('Profile pressed')} />

      <View style={{ width: '100%' }}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>Add New Payment</Text>
      </View>


      <View style={{ marginHorizontal: 20 }}>
        <TextInput
          placeholder="Amount"
          placeholderTextColor={theme.colors.outline}
          value={form.amount}
          onChangeText={(text) => handleChange('amount', text)}
          keyboardType="numeric"
          style={[styles.input, { borderColor: theme.colors.outline, color: theme.colors.onBackground }]}
        />

        <TextInput
          placeholder="Receiver"
          placeholderTextColor={theme.colors.outline}
          value={form.receiver}
          onChangeText={(text) => handleChange('receiver', text)}
          style={[styles.input, { borderColor: theme.colors.outline, color: theme.colors.onBackground }]}
        />
      </View>
      {/* Payment Method */}
      <Text style={[styles.label, { color: theme.colors.onBackground }]}>Payment Method</Text>
      <View style={styles.optionGroup}>
        {['UPI', 'Card', 'Wallet', 'Net Banking'].map((item) => (
          <Pressable
            key={item}
            onPress={() => handleChange('method', item)}
            style={[
              styles.optionButton,
              {
                backgroundColor:
                  form.method === item ? theme.colors.primary : theme.colors.surface,
                borderColor: theme.colors.outline,
              },
            ]}
          >
            <Text
              style={[
                styles.optionText,
                { color: form.method === item ? theme.colors.onPrimary : theme.colors.onSurface },
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Payment Status */}
      <Text style={[styles.label, { color: theme.colors.onBackground }]}>Status</Text>
      <View style={styles.optionGroup}>
        {['Success', 'Pending', 'Failed'].map((item) => (
          <Pressable
            key={item}
            onPress={() => handleChange('status', item)}
            style={[
              styles.optionButton,
              {
                backgroundColor:
                  form.status === item ? theme.colors.primary : theme.colors.surface,
                borderColor: theme.colors.outline,
                padding: 10,
              },
            ]}
          >
            <Text
              style={[
                styles.optionText,
                { color: form.status === item ? theme.colors.onPrimary : theme.colors.onSurface },
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handleSubmit}
      >
        <Text style={[styles.buttonText, { color: theme.colors.onPrimary }]}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  title: {
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginVertical: 20,
    marginTop: 20,
    fontFamily: 'Poppins_600SemiBold',

  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontFamily: 'Poppins_400Regular',
  },
  label: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginVertical: 20,
    marginTop: 20,
    fontFamily: 'Poppins_500Medium',
  },
  optionGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,

  },
  optionText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
  },
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
});
