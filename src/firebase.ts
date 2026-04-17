// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNqE_vE701GasEvMLUJzkMx8_zF8ld_OU",
  authDomain: "vida-en-orden-79eb8.firebaseapp.com",
  projectId: "vida-en-orden-79eb8",
  storageBucket: "vida-en-orden-79eb8.firebasestorage.app",
  messagingSenderId: "798241207045",
  appId: "1:798241207045:web:4818c0267cb3a00c12fd6c",
  measurementId: "G-VL0TGPZHJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);