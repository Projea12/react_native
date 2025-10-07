// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACdGsr-m3HoajA9wPGfvc8PtsOxXGxqHA",
  authDomain: "jpmip-5a431.firebaseapp.com",
  projectId: "jpmip-5a431",
  storageBucket: "jpmip-5a431.firebasestorage.app",
  messagingSenderId: "767404722800",
  appId: "1:767404722800:web:205ab6fb3c5668a65dc2b5",
  measurementId: "G-4Y0J1SGDG9"
};

// Initialize Firebase - avoid duplicate initialization
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// export const analytics = getAnalytics(app);

// Initialize Firebase Auth - AsyncStorage is automatically used by Firebase in React Native
export const auth = getAuth(app);
