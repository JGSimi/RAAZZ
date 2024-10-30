// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBf5unct1KREd59zfKW8yzi0jTkL6XDrU4",
  authDomain: "raazz-86ab1.firebaseapp.com",
  projectId: "raazz-86ab1",
  storageBucket: "raazz-86ab1.appspot.com",
  messagingSenderId: "589093735663",
  appId: "1:589093735663:web:19c8a3ce78b95fb9044da",
  measurementId: "G-PCMWK3STLE"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Provedor de autenticação do Google
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
