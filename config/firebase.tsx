// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth, getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from 'react-native';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt-QoNeKuR3AyaVhtdV9cnsgOAnLlaz9g",
  authDomain: "expense-tracker-bc368.firebaseapp.com",
  projectId: "expense-tracker-bc368",
  storageBucket: "expense-tracker-bc368.firebasestorage.app",
  messagingSenderId: "523197921357",
  appId: "1:523197921357:web:dedfc772d238a7b63f0404"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//authentication
let auth:Auth;

if (Platform.OS === 'web') {
  // ✅ For web, use getAuth
  auth = getAuth(app);
} else {
  // ✅ For native, use initializeAuth with AsyncStorage
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

//database
 const db = getFirestore(app);

 export { auth, db };
