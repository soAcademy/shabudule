import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCzOS6r6x_nrvqnBM-pXLvttv9aKLnFVlw",
  authDomain: "shabudule.firebaseapp.com",
  projectId: "shabudule",
  storageBucket: "shabudule.appspot.com",
  messagingSenderId: "458585135469",
  appId: "1:458585135469:web:d755d27d544e2b24db6264",
  measurementId: "G-W660MCEFWK",
};

export const fire = initializeApp(firebaseConfig);


