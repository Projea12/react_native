import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import {CounterProvider, useCounter} from "./counter_context";

function CounterDisplay () {
    const {count} = useCounter();
    return <Text style = {styles.text}>
        Number:{count}
    </Text>
}

function IncreaseButton(){
   const {increment} = useCounter();
   return <Button title="+" onPress={increment} />
}

function DecreaseButton(){
   const {decrement} = useCounter();
   return <Button title="-" onPress={decrement} />
}

function Home() {
  return (
    <View style={styles.container}>
      <CounterDisplay />
      {/* <IncreaseButton />
      <DecreaseButton /> */}
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
