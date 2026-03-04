import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDTTheme } from '@dangerousthings/react-native';
import type { RootStackParamList } from './types';

import { HomeScreen } from '../screens/HomeScreen';
import { ButtonsScreen } from '../screens/ButtonsScreen';
import { CardsScreen } from '../screens/CardsScreen';
import { FormsScreen } from '../screens/FormsScreen';
import { FeedbackScreen } from '../screens/FeedbackScreen';
import { OverlaysScreen } from '../screens/OverlaysScreen';
import { ThemeScreen } from '../screens/ThemeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const theme = useDTTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.custom.modeNormal,
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: { backgroundColor: theme.colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Buttons"
        component={ButtonsScreen}
        options={{ title: 'BUTTONS & ACTIONS' }}
      />
      <Stack.Screen
        name="Cards"
        component={CardsScreen}
        options={{ title: 'CARDS & LABELS' }}
      />
      <Stack.Screen
        name="Forms"
        component={FormsScreen}
        options={{ title: 'FORM CONTROLS' }}
      />
      <Stack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{ title: 'PROGRESS & FEEDBACK' }}
      />
      <Stack.Screen
        name="Overlays"
        component={OverlaysScreen}
        options={{ title: 'OVERLAYS & NAV' }}
      />
      <Stack.Screen
        name="Theme"
        component={ThemeScreen}
        options={{ title: 'THEME REFERENCE' }}
      />
    </Stack.Navigator>
  );
}
