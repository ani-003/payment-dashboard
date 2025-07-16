import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

import { StatusBar } from 'react-native';
import 'react-native-reanimated';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import UserModal from '../components/allScreens/UserModal';

import { useColorScheme } from '@/hooks/useColorScheme';

import { useAppTheme } from '../src/theme/index';

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';


import {
  MaterialCommunityIcons
} from '@expo/vector-icons';



export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = useAppTheme();


   // ✅ THIS LINE IS NEEDED


  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    ...MaterialCommunityIcons.font,
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider theme={theme}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

            <StatusBar
              barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}

              backgroundColor={theme.colors.primary}
              
            />
            
             <UserModal />
            <Stack>
              <Stack.Screen name="splash" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>

          </ThemeProvider>
        </PaperProvider>

      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
