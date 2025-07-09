// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'; // <-- THIS LINE IS REQUIRED

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-oVRfhx1sDlnwz77Hk6N7rHV1j9tZGTE",
  authDomain: "pomodoro-4af61.firebaseapp.com",
  projectId: "pomodoro-4af61",
  storageBucket: "pomodoro-4af61.firebasestorage.app",
  messagingSenderId: "671866239353",
  appId: "1:671866239353:web:5b94e60111289fc00657a8",
  measurementId: "G-F7FH5J25JH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app); 