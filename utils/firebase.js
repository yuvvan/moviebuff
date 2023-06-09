// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbwa1ioqh5P0XPEVQMdxOb-LocFSy0P3k",
  authDomain: "reactgamecat.firebaseapp.com",
  projectId: "reactgamecat",
  storageBucket: "reactgamecat.appspot.com",
  messagingSenderId: "533354456946",
  appId: "1:533354456946:web:af1cc3d85a56a76437dfeb",
  measurementId: "G-0LXDFQW990"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);