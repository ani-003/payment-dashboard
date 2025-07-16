import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';
import { useColorScheme } from 'react-native';

export function useAppTheme() {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
}
