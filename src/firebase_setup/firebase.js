// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNXZdYpF7C82lV5hOlre-jWoLDosNLdjY",
  authDomain: "liteval.firebaseapp.com",
  projectId: "liteval",
  storageBucket: "liteval.appspot.com",
  messagingSenderId: "337252383270",
  appId: "1:337252383270:web:2b0f9e2ccf0535ecce84e7",
  measurementId: "G-910XGQ5GWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);