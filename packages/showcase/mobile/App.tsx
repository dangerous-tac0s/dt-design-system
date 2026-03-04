import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { DTThemeProvider } from '@dangerousthings/react-native';
import { BrandProvider, useBrand } from './src/brand/BrandContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { useNavigationTheme } from './src/navigation/navigationTheme';

function AppContent() {
  const { theme } = useBrand();
  const navigationTheme = useNavigationTheme();

  return (
    <DTThemeProvider theme={theme}>
      <NavigationContainer theme={navigationTheme}>
        <RootNavigator />
      </NavigationContainer>
    </DTThemeProvider>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Tektur: require('./assets/fonts/Tektur-VariableFont_wdth,wght.ttf'),
    'Tektur-Regular': require('./assets/fonts/Tektur-Regular.ttf'),
    'Tektur-Medium': require('./assets/fonts/Tektur-Medium.ttf'),
    'Tektur-SemiBold': require('./assets/fonts/Tektur-SemiBold.ttf'),
    'Tektur-Bold': require('./assets/fonts/Tektur-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00FFFF" />
      </View>
    );
  }

  return (
    <BrandProvider initialBrand="dt">
      <AppContent />
    </BrandProvider>
  );
}
