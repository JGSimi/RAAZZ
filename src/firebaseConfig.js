// src/firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBf5unct1KREd59zfKW8yzi0jTkL6XDrU4",
  authDomain: "raazz-86ab1.firebaseapp.com",
  projectId: "raazz-86ab1",
  storageBucket: "raazz-86ab1.appspot.com",
  messagingSenderId: "589093735663",
  appId: "1:589093735663:web:19c8a3ce78b95fb9044da",
  measurementId: "G-PCMWK3STLE"
};

// Inicialize o app Firebase apenas se ainda não estiver inicializado
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app); // Adiciona Firestore
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
