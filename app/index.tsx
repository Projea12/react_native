// import React from 'react';
// import { View, Text, Button, StyleSheet } from "react-native";
// import { CounterProvider, useCounter } from "../app/cal_react_context/counter_context.jsx";

// function CounterDisplay() {
//   const { count } = useCounter();
//   return <Text style={styles.text}>Count: {count}</Text>;
// }

// function CounterButton() {
//   const { increment } = useCounter();
//   return <Button title="+" onPress={increment} />;
// }

// function CounterDecrease(){
//   const {decrement} = useCounter();
//   return <Button title='-' onPress={ decrement}/>
// }
// function ResetValue (){
//   const {reset} = useCounter();
//   return <Button title='Reset' onPress={reset}/>
// }

// function Home() {
//   return (
//     <View style={styles.container}>
//       <CounterDisplay />
//       <CounterButton />
//       <CounterDecrease/>
//       <ResetValue/>
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <CounterProvider>
//       <Home />
//     </CounterProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
// });


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuthState, } from './src/context/auth_context'; 
// import {useAuth}fr;
import { container } from './src/di/container';
import { LoginScreen } from './screens/LoginScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { HomeScreen } from './screens/HomeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { SplashScreen } from './src/presentation/splash_screen';


const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { status, initializing } = useAuthState();

  if (initializing) {
    return <SplashScreen />; 
  }

  return (
    <Stack.Navigator>
      {status === 'authenticated' ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}