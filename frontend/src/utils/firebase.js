// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cotexai-7fd03.firebaseapp.com",
  projectId: "cotexai-7fd03",
  storageBucket: "cotexai-7fd03.firebasestorage.app",
  messagingSenderId: "751139412242",
  appId: "1:751139412242:web:8269f458230e8d5b73fbcb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
