import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';


import { useColorScheme } from '@/hooks/useColorScheme';
import ContextAuth, { useAppContext } from './Context/ContextAuth';
import { MenuProvider } from 'react-native-popup-menu';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
    <MenuProvider>
    <ContextAuth>
      <RootStack/>
    </ContextAuth>
    </MenuProvider>
  );
}

const RootStack = () => {
  const { username, isAuthenticated } = useAppContext();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated || username? (
        <>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </>
      ) : (
        <>
          <Stack.Screen name='index' />
        </>
      )}
    </Stack>
  );
}