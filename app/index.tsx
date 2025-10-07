import React from 'react';
import { Redirect } from 'expo-router';
import { useAuthState } from './src/context/auth_context';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

export default function Index() {
  const { status } = useAuthState();

  // Show loading screen while auth state is being determined
  if (status === 'idle' || status === 'loading') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  // Redirect based on authentication status
  if (status === 'authenticated') {
    return <Redirect href="/home" />;
  } else {
    return <Redirect href="/login" />;
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  text: { 
    marginTop: 10, 
    fontSize: 16,
    color: '#333333'
  },
});
