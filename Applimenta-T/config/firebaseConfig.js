// config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBB-aflnLBGJ17xP9MknZMymen8irw8yUo",
  authDomain: "applimenta-t.firebaseapp.com",
  projectId: "applimenta-t",
  storageBucket: "applimenta-t.firebasestorage.app",
  messagingSenderId: "73895335255",
  appId: "1:73895335255:web:e7539b87ede47f86b71a12"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;