import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuthState, useAuthAction } from '../context/auth_context';

export const HomeScreen = () => {
  const { user } = useAuthState();
  const { logout } = useAuthAction();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text>User ID: {user?.uid}</Text>
      <Text>Email: {user?.email}</Text>

      <View style={{ height: 12 }} />
      <Button title="Sign out" onPress={() => logout()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
});
