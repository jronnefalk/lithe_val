// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, remove } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNXZdYpF7C82lV5hOlre-jWoLDosNLdjY",
  authDomain: "liteval.firebaseapp.com",
  databaseURL: "https://liteval-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "liteval",
  storageBucket: "liteval.appspot.com",
  messagingSenderId: "337252383270",
  appId: "1:337252383270:web:dbafe11167ecc773ce84e7",
  measurementId: "G-44PFP6SK89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const saveKurs = (kurs) => {
  const user = auth.currentUser;

  if (user) {
    push(ref(database, `users/${user.uid}/${kurs.kurskod}`), kurs);
    console.log(" kursen har läggts till");
  } else {
    console.log("No user is signed in");
  }
};

const deleteKurs = (kurs) => {
  const user = auth.currentUser;
  if (user) {
    const kursRef = ref(database, `users/${user.uid}/${kurs.kurskod}`);

    remove(kursRef)
      .then(() => {
        console.log("Kurs removed successfully");
      })
      .catch((error) => {
        console.log("Error removing kurs:", error.message);
      });
  } else {
    console.log("No user is signed in");
  }
};

export { saveKurs, deleteKurs };
export default app;
