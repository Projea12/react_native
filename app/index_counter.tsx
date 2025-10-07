import React from 'react';
import { View, Text, Button, StyleSheet } from "react-native";
import { CounterProvider, useCounter } from "../app/cal_react_context/counter_context.jsx";

function CounterDisplay() {
  const { count } = useCounter();
  return <Text style={styles.text}>Count: {count}</Text>;
}

function CounterButton() {
  const { increment } = useCounter();
  return <Button title="+" onPress={increment} />;
}

function CounterDecrease(){
  const {decrement} = useCounter();
  return <Button title='-' onPress={ decrement}/>
}
function ResetValue (){
  const {reset} = useCounter();
  return <Button title='Reset' onPress={reset}/>
}

function Home() {
  return (
    <View style={styles.container}>
      <CounterDisplay />
      <CounterButton />
      <CounterDecrease/>
      <ResetValue/>
    </View>
  );
}

export default function App() {
  return (
    <CounterProvider>
      <Home />
    </CounterProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});