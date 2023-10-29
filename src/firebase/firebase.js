import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBXR0zw2aCoBBrDg46CGBmMnKvZJ34hHFg",
  authDomain: "time-tracker-2d38f.firebaseapp.com",
  projectId: "time-tracker-2d38f",
  storageBucket: "time-tracker-2d38f.appspot.com",
  messagingSenderId: "724696939189",
  appId: "1:724696939189:web:7522a056643ec753ae1cfc",
  measurementId: "G-6KF1HM8F58"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);