// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCbNDYitm5lw_yUoSch2DNjH1UV-XgZVyo",
  authDomain: "support2024.firebaseapp.com",
  databaseURL: "https://support2024-default-rtdb.firebaseio.com",
  projectId: "support2024",
  storageBucket: "support2024.firebasestorage.app",
  messagingSenderId: "782112303571",
  appId: "1:782112303571:web:14dee915ae8689d7f3e726",
  measurementId: "G-3GJR9JDHDC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
