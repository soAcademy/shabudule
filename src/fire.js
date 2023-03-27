import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBg-DD1oa-bRrVnwleYywZztV9cOmcZNyg",
  authDomain: "sprinttech-shabudule-login.firebaseapp.com",
  projectId: "sprinttech-shabudule-login",
  storageBucket: "sprinttech-shabudule-login.appspot.com",
  messagingSenderId: "425189549913",
  appId: "1:425189549913:web:f614e51c520c0f62230e48",
  measurementId: "G-2CWGYJB8RY",
};

export const fire = initializeApp(firebaseConfig);
export const auth = getAuth(fire);

