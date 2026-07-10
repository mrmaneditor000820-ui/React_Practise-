import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-project-2e24c.firebaseapp.com",
  projectId: "react-project-2e24c",
  storageBucket: "react-project-2e24c.firebasestorage.app",
  messagingSenderId: "159893641433",
  appId: "1:159893641433:web:2056e34713e1b2af7b46c8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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

export const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("Login successful:", user);
    return user;
  } catch (error) {
    console.error("Error:", error.code, error.message);
    throw error;
  }
};