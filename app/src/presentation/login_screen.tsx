import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuthAction, useAuthState } from '../context/auth_context';
import { Link } from 'expo-router';


export const LoginScreen = () => {
  const { status, error } = useAuthState();
  const { login } = useAuthAction();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async ()=> {
    if(!email || !password || password.length< 6){
      return 'All fields are required'
    }
    try {
      await login(email.trim(), password);
    } catch (e) {
      console.log('login error', e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
        <Button title="Login" onPress={submit} disabled={!email || !password} />
      )}

      <View style={{ height: 8 }} />
      <Link href="/signup" asChild>
        <Button title="Create account" onPress={() => {}} />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, padding: 8, marginBottom: 12, borderRadius: 6 },
  error: { color: 'red', marginBottom: 8 },
});
