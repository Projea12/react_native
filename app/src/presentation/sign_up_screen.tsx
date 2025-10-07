import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuthAction, useAuthState } from '../context/auth_context';
import { useRouter } from 'expo-router';


export const SignUpScreen = () => {
  const { status, error } = useAuthState();
  const { register } = useAuthAction();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit() {
    try {
      await register(email.trim(), password);
    } catch (e) {
      console.log('register error', e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      {status === 'loading' ? (
        <ActivityIndicator />
      ) : (
        <Button title="Create account" onPress={submit} disabled={!email || !password} />
      )}

      <View style={{ height: 8 }} />
      <Button title="Back to Login" onPress={() => router.back()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, padding: 8, marginBottom: 12, borderRadius: 6 },
  error: { color: 'red', marginBottom: 8 },
});
