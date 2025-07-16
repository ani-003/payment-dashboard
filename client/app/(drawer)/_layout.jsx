import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function DrawerLayout() {
  const theme = useTheme();

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: theme.colors.highlight, 
        drawerStyle: {
          backgroundColor: theme.colors.surface,
          width: 240,
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home', 
          drawerIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="About"
        options={{
          drawerLabel: 'About',
          drawerIcon: ({ color, size }) => (
            <Feather name="info" size={24} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Contact"
        options={{
          drawerLabel: 'Contact Me', // ✅ fix here too
          drawerIcon: ({ color, size }) => (
            <FontAwesome6 name="contact-card" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="AddPaymentScreen"
        options={{
          drawerLabel: 'New Payment',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="payment" size={24} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
