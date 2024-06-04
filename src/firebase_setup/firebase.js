// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, remove, update, get } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const saveKurs = (kurs, nr) => {
  const user = auth.currentUser;
  if (user) {
    const kursRef = ref(database, `users/${user.uid}/Kurser/${kurs.kurskod}`);

    set(kursRef, { Termin: kurs.termin[nr] })
      .then(() => {
        console.log("Kursen har lagts till");
      })
      .catch((error) => {
        console.log("Error adding kurs:", error.message);
      });
  } else {
    console.log("No user is signed in");
    alert("Du måste logga in för att lägga till en kurs.");
  }
};

const deleteKurs = (kurs) => {
  const user = auth.currentUser;
  if (user) {
    const kursRef = ref(database, `users/${user.uid}/Kurser/${kurs.kurskod}`);

    remove(kursRef)
      .then(() => {
        console.log("Kurs removed successfully");
      })
      .catch((error) => {
        console.log("Error removing kurs:", error.message);
        console.log("kursRef:", kursRef.toString());
      });
  } else {
    console.log("No user is signed in");
  }
};

const moveKurs = (kurs, ny) => {
  const user = auth.currentUser;
  if (user) {
    const kursRef = ref(database, `users/${user.uid}/Kurser/${kurs.kurskod}`);

    update(kursRef, { Termin: ny })
      .then(() => {
        console.log("Kurs updated successfully");
      })
      .catch((error) => {
        console.log("Error updating kurs:", error.message);
      });
  } else {
    console.log("No user is signed in");
  }
};

// En funktion som samlar alla kurser en användare har valt WIP
async function getUserData() {
  const user = auth.currentUser;
  if (user) {
    const kursRef = ref(database, `users/${user.uid}/Kurser/`);

    try {
      const kursSnapshot = await get(kursRef);
      const kursData = kursSnapshot.val(); // kursData är ett objekt med alla kurser
      let kursArray = [];

      // Omvandlar objektet till en array
      for (const courseCode in kursData) {
        kursArray.push(courseCode);
      }

      return kursArray;
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("No user is signed in");
  }
}

export { saveKurs, deleteKurs, moveKurs, getUserData, database, auth };
export default app;
