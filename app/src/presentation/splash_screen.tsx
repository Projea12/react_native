import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

export const SplashScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
    <Text style={styles.text}>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginTop: 10, fontSize: 16 },
});
