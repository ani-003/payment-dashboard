import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API = 'http://192.168.10.2:5000';


const useAuthStore = create((set) => ({
  user: null,
  token: null,
  error: '',
  loading: false,

  login: async (username, password) => {
    set({ loading: true, error: '' });
    try {
      const res = await axios.post(`${API}/auth/login`, { username, password });

      const token = res.data.access_token;
      const user = { username }; 

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      set({ user, token });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Login failed' });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    set({ user: null, token: null });
  },

  loadUserFromStorage: async () => {
    const token = await AsyncStorage.getItem('token');
    const userData = await AsyncStorage.getItem('user');
    if (token && userData) {
      set({ token, user: JSON.parse(userData) });
    }
  },

  setUser: (user) => set({ user }),
}));

export default useAuthStore;
