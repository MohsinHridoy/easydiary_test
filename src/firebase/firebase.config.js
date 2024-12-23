// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the auth module
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZPe6TnrrJST3gAqdjk5fIuPcbsjs2hp0",
  authDomain: "easy-diary-3f45d.firebaseapp.com",
  projectId: "easy-diary-3f45d",
  storageBucket: "easy-diary-3f45d.firebasestorage.app",
  messagingSenderId: "750496426758",
  appId: "1:750496426758:web:6fc77b77682e6bf2544c87",
  measurementId: "G-JLRKRWQW2Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
export const auth = getAuth(app); // Export the auth instance

// Initialize Firestore
export const db = getFirestore(app); // Export the Firestore instance
