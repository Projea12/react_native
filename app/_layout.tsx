import React from 'react';
import { Slot } from 'expo-router';
import { AuthProvider } from './src/context/auth_context'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "./global.css";
import { HomeScreen } from './src/presentation/home_screen';
import { LoginScreen } from './src/presentation/login_screen';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
       <LoginScreen/>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
