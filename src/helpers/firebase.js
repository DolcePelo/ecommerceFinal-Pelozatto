// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbJma3ZAzolBOJyFZ7zcNexzbU2y_xKDg",
  authDomain: "proyecto-charly-98e5c.firebaseapp.com",
  projectId: "proyecto-charly-98e5c",
  storageBucket: "proyecto-charly-98e5c.appspot.com",
  messagingSenderId: "188783923937",
  appId: "1:188783923937:web:a0330b0ca3abe0f5941da0",
  measurementId: "G-TWWZPBMJ05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
