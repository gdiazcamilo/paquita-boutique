import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-sLfv2pw69_Brl7i5sFl36xtkk_zNmTU",
  authDomain: "paquita-boutique.firebaseapp.com",
  projectId: "paquita-boutique",
  storageBucket: "paquita-boutique.appspot.com",
  messagingSenderId: "923208346866",
  appId: "1:923208346866:web:58ba544a8fe05a6bd3b46b",
  measurementId: "G-2ME5N0NN3T",
};

export const app = initializeApp(firebaseConfig);
export const authorizer = getAuth();

const googleProvider = new GoogleAuthProvider();

export const signInWithGooglePopUp = () =>
  signInWithPopup(authorizer, googleProvider);
