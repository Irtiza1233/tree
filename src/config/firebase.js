// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC43BvOXOg4YVjPLMo2XVck_5QH7pKE3Lw",
    authDomain: "new12345-f00b2.firebaseapp.com",
    projectId: "new12345-f00b2",
    storageBucket: "new12345-f00b2.appspot.com",
    messagingSenderId: "1060430109030",
    appId: "1:1060430109030:web:55b7ca341aaba1b03b50a7",
    measurementId: "G-8B4BQD3V9S"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {analytics, auth, firestore, storage}