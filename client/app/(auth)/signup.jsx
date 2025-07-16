import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, KeyboardAvoidingView,
  ScrollView, TouchableWithoutFeedback, Keyboard, Platform, Animated, LayoutAnimation, UIManager
} from 'react-native';
import {
  TextInput, Button, Text, useTheme, Modal, Portal
} from 'react-native-paper';
import useAuthStore from '../../src/store/authStore';
import { useRouter } from 'expo-router';





export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);

  const { signup, login, error, loading, user, logout } = useAuthStore();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (user) router.replace('/home');
  }, [user]);

  const handleSignin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }


    await login(email, password);



    if (!user) {
      setShowModal(true);
    }


  };

  const handleSignup = async () => {
    if (!email || !password || !name) {
      alert('Please enter name, email, and password');
      return;
    }

    try {
      await signup(email, password, name);
      setShowModal(false);
      setShowNameInput(false);

    } catch (err) {
      console.error('Signup error:', err.message);
    }
  };

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Text style={[styles.title, { color: theme.colors.onBackground }]}>Sign In To Continue</Text>

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={[styles.input, { borderColor: theme.colors.outline }]}
            />
            <TextInput
              label="Password"

              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              mode="outlined"
              placeholder='Enter your password'
              placeholderTextColor={theme.colors.onSurface}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              style={[styles.input, { borderColor: theme.colors.outline }]}


            />



            <Button
              mode="contained"
              loading={loading}
              onPress={handleSignin}
              style={styles.button}
              labelStyle={{ fontFamily: 'Poppins_500Medium', fontSize: 16 }}
              contentStyle={{ paddingVertical: 6 }}
            >
              Sign In
            </Button>

            <Button
              mode="outlined"
              onPress={() => logout()}
              style={styles.button}
              labelStyle={{
                fontFamily: 'Poppins_500Medium', fontSize: 16
              }}
            >
              logout</Button>


            {error ? (
              <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
                {error}
              </Text>
            ) : null}


            <View
              style={{
                position: 'absolute',
                bottom: 40,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',

              }}
            >
              <Text style={{ textAlign: 'center', fontFamily: 'Poppins_400Regular' }}>
                Assignment  By  Anirban  Das
              </Text>
            </View>



            <Portal>

            </Portal>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: {
    fontSize: 22, textAlign: 'center', marginBottom: 20,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'left',
    marginBottom: 40,
  },

  input: {
    marginBottom: 15,

    fontFamily: 'Poppins_400Regular'
  },

  button: {
    marginTop: 10

  },
  error: { color: 'red', marginTop: 10, textAlign: 'center' },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalBtn: {
    marginVertical: 5,
  },
});


export const options = {
  headerShown: false,
};