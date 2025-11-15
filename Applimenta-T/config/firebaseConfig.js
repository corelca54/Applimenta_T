// config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ IMPORTANTE: Usar variables de entorno en lugar de hardcodear credenciales
// Crear archivo .env en la raíz del proyecto (NO subir a Git)
// Ver .env.example para variables requeridas

// Obtener configuración desde variables de entorno
// En Expo, accedibles vía process.env o Constants.expoConfig.extra
// Preferir variables de entorno. .env (no en repo) puede definir FIREBASE_API_KEY, FIREBASE_APP_ID, etc.
// ⚠️ CRÍTICO: Obtén estas credenciales de Firebase Console
// 1. Ve a: https://console.firebase.google.com
// 2. Selecciona proyecto "applimenta-t"
// 3. Settings (engranaje) → Project settings → Web apps
// 4. Copia el objeto "firebaseConfig" completo y reemplaza abajo
// La apiKey actual NO es válida - eso causa el error "auth/api-key-not-valid"

const firebaseConfig = {
  apiKey: "AIzaSyAVsJSj4Kxj6rPw3TD9GsMK1JYTfAPaB48",
  authDomain: "applimenta-t.firebaseapp.com",
  projectId: "applimenta-t",
  storageBucket: "applimenta-t.firebasestorage.app",
  messagingSenderId: "73895335255",
  appId: "1:73895335255:web:e7539b87ede47f86b71a12"
};


// Validar que las credenciales estén configuradas
if (!firebaseConfig.apiKey) {
  console.error('❌ Firebase API Key no está configurada. Revisa tu archivo .env');
} else {
  console.log('Firebase API Key cargada (long):', firebaseConfig.apiKey.length);
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth con persistencia React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export default app;