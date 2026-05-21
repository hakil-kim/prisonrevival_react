import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase configuration using environment variables with defaults provided by the user.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBk7XL15HFllNgqbW9Itlod_boyDnNemY8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "prisonrevival-ecaa4.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://prisonrevival-ecaa4-default-rtdb.firebaseio.com/",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "prisonrevival-ecaa4",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "prisonrevival-ecaa4.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "323798989778",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:323798989778:web:8ab0f928e6fada9252660b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const db = getDatabase(app);
