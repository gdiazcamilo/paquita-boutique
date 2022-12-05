import { firebaseConfig as devConfig } from "./firebase.conf.dev.mjs";

// Set all this values in other file such
// as firebase.conf.dev.js and spread the config object here
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
  ...devConfig,
};
