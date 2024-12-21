// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import the auth module
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX7eL_KxfFk2QG_u3_sq2lE_vbLCq6Gxw",
  authDomain: "easy-diary-12c70.firebaseapp.com",
  projectId: "easy-diary-12c70",
  storageBucket: "easy-diary-12c70.firebasestorage.app",
  messagingSenderId: "825785926393",
  appId: "1:825785926393:web:1cced5d56a2e8c0395d828",
  measurementId: "G-G69E4S8ZZL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);  // Export the auth instance
