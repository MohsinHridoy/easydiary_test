import { createContext, useEffect, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../firebase/firebase.config"; // Firestore instance
import { app } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Fetch user data from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        getDoc(userDocRef)
          .then((userDocSnapshot) => {
            if (userDocSnapshot.exists()) {
              const userData = userDocSnapshot.data();
              // Update the user state with both auth and firestore data
              setUser({
                ...currentUser, // Include the auth-related info (email, UID, etc.)
                ...userData,    // Include the additional data from Firestore (name, designation, etc.)
              });
            } else {
              // If no data exists in Firestore, set user as authenticated with minimal data
              setUser({ ...currentUser, missingData: true });
            }
          })
          .catch((error) => {
            console.error("Error fetching user data from Firestore: ", error);
            setUser({ ...currentUser, missingData: true });
          });
      } else {
        setUser(null); // If user is not authenticated, clear the user state
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  const createUser = async (email, password, additionalData) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(db, "users", userCredential.user.uid);

      // Save user data (email + additionalData) in Firestore
      await setDoc(userDocRef, {
        email,
        ...additionalData,
        createdAt: new Date().toISOString(),
      });

      // Set the user state after successful creation
      setUser({ ...userCredential.user, ...additionalData });

      return userCredential;
    } catch (error) {
      console.error("Signup failed:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Fetch additional user data from Firestore
      const userDocRef = doc(db, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();

        // Set the user state with both auth and firestore data
        setUser({
          email: userCredential.user.email,
          ...userData, // Add the user data from Firestore (name, designation, etc.)
        });

        return { user: userCredential.user, userData };
      } else {
        throw new Error("No additional user data found.");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
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
      setUser(null); // Clear user state
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
