// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAOnl8pqW3Kex8UlBSU2sbBWkG1pSU2_a0",
  authDomain: "fir-auth-react-76b8a.firebaseapp.com",
  projectId: "fir-auth-react-76b8a",
  storageBucket: "fir-auth-react-76b8a.appspot.com",
  messagingSenderId: "902384611779",
  appId: "1:902384611779:web:6e7c38ecc4118695698d76",
  measurementId: "G-WCGL8NZHWW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db= getFirestore(app);
