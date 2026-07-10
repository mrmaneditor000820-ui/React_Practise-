import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-project-2e24c.firebaseapp.com",
  projectId: "react-project-2e24c",
  storageBucket: "react-project-2e24c.firebasestorage.app",
  messagingSenderId: "159893641433",
  appId: "1:159893641433:web:2056e34713e1b2af7b46c8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Signup with Email/Password
export const handleSignup = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: name });
    console.log("Signup successful:", user);
    return user;
  } catch (error) {
    console.error("Error:", error.code, error.message);
    throw error;
  }
};

// Login with Email/Password
export const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successful:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error:", error.code, error.message);
    throw error;
  }
};

// Continue with Google
export const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google Sign-In successful:", result.user);
    return result.user;
  } catch (error) {
    console.error("Error:", error.code, error.message);
    throw error;
  }
};

// Logout
export const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error:", error.code, error.message);
    throw error;
  }
};

export { auth, onAuthStateChanged };