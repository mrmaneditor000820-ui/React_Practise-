
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-project-2e24c.firebaseapp.com",
  projectId: "react-project-2e24c",
  storageBucket: "react-project-2e24c.firebasestorage.app",
  messagingSenderId: "159893641433",
  appId: "1:159893641433:web:2056e34713e1b2af7b46c8"
};


const app = initializeApp(firebaseConfig);