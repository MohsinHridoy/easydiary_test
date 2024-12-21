import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  const createUser = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      // ডিবাগিং জন্য লগ
      console.log('User Credential:', userCredential);
  
      // যদি userCredential এবং user থাকে, তবে সেটি ইউজার স্টেটে সেট করা হবে
      if (userCredential && userCredential.user) {
        setUser(userCredential.user);
        Swal.fire("Signup successful", "Welcome aboard!", "success");
      } else {
        throw new Error("User registration failed. No user information returned.");
      }
    } catch (error) {
      console.error("Signup failed:", error.message); // ত্রুটি লগ করা
      Swal.fire("Signup failed", error.message, "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      Swal.fire("Login successful", "Welcome back!", "success");
      return userCredential.user;
    } catch (error) {
      Swal.fire("Login failed", error.message, "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      Swal.fire("Logged out", "See you again soon!", "success");
    } catch (error) {
      Swal.fire("Logout failed", error.message, "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
