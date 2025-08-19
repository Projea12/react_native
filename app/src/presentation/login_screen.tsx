import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuthAction, useAuthState } from '../context/auth_context';


export const LoginScreen = ({navigation}:any) => {
    const {status,error} = useAuthState();
    const {login} = useAuthAction();
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
}
