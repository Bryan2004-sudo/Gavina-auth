// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLPjTiEgpHRR0CsijOnhMZHpmt74AccJ0",
  authDomain: "gavina-auth.firebaseapp.com",
  projectId: "gavina-auth",
  storageBucket: "gavina-auth.firebasestorage.app",
  messagingSenderId: "10663800245",
  appId: "1:10663800245:web:9d676463ea5c535f06bdfc",
  measurementId: "G-CXT7C4L5Y1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined" && isSupported()) {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
export { analytics };