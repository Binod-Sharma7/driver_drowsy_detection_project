import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDuya52W04bvME4H7K-IiDiK4bOwFsYITc",
  authDomain: "driver-drowsiness-detect-a1ea3.firebaseapp.com",
  databaseURL:
    "https://driver-drowsiness-detect-a1ea3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "driver-drowsiness-detect-a1ea3",
  storageBucket: "driver-drowsiness-detect-a1ea3.firebasestorage.app",
  messagingSenderId: "160129505869",
  appId: "1:160129505869:web:53a9112473e5e5acb31a04",
  measurementId: "G-4QRLC8GPG9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Realtime Database
const db = getDatabase(app);

export { app, db };