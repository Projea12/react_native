import React from "react";
import { SafeAreaView, Text, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { increase, decrease } from "../calculator/slice";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: any) => state.auth.value);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.number}>Number: {count}</Text>
      <Button title="-" onPress={() => dispatch(decrease())} />
      <Button title="+" onPress={() => dispatch(increase())} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  number: { fontSize: 24, marginBottom: 20 },
});

export default HomeScreen;
