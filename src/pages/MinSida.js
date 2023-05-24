import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import getData from "../functions/getData";
import {
  database,
  deleteKurs,
  moveKurs,
  auth,
} from "../firebase_setup/firebase.js";
import Schema from "../components/Schema";
import Visualisering from "../components/Visualisering.js";

//Style

import { HelaSchemaCont } from "../styles/Container.styled";
import { TitelSOchV } from "../styles/Text.styled";
import { GlobalStyles } from "../styles/General.styled";
import { BsArrowLeft } from "react-icons/bs";
import { BackToStartLink } from "../styles/Knappar.styled";

export function MinSida() {
  // skapar variabler för att spara data i
  const { currentUser } = getAuth();

  // Kursdata innehåller kurser från firebase sparade kurskod och termin där indexen är 0,1,2 osv
  const [FireBaseData, setFireBaseData] = useState([]);

  // courseData innehåller alla kursers information från getData() med index i kurskod
  const [courseData, setCourseData] = useState({});

  // funtioner för att ta bort och flytta kurser
  function handleDelete(kurs) {
    // Remove the kurs from the database

    deleteKurs(kurs);
    // Update the kursData state variable
    setFireBaseData(FireBaseData.filter((k) => k.kurskod !== kurs));
  }

  function handleMove(kurs) {
    const availableTerms = Object.values(getData(kurs.kurskod).termin).filter(
      (term) => term !== courseData[kurs.kurskod]?.termin
    );

    if (availableTerms.length > 0) {
      moveKurs(kurs, availableTerms[0]);
      const newTerm = availableTerms[0];
      const updatedKursData = [...FireBaseData];
      const index = updatedKursData.findIndex(
        (k) => k.kurskod === kurs.kurskod
      );
      updatedKursData[index] = { ...kurs, termin: newTerm };

      setFireBaseData(updatedKursData);
    }
  }

  // hämtar data från firebase och lägger in i variablerna

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User logged in:", user);
      if (user) {
        if (currentUser) {
          const kursRef = ref(database, `users/${currentUser.uid}/Kurser`);

          onValue(kursRef, async (snapshot) => {
            const data = snapshot.val();
            console.log("Firebase data:", data);

            if (data) {
              const kursArray = Object.keys(data).map((key) => ({
                kurskod: key,
                termin: data[key].Termin,
              }));

              setFireBaseData(kursArray);
              console.log("FireBaseData:", kursArray);

              const courseDataArray = await Promise.all(
                kursArray.map(async (kurs) => {
                  const data = await getData(kurs.kurskod);
                  data.termin = kurs.termin;
                  return { [kurs.kurskod]: data };
                })
              );

              const newCourseData = courseDataArray.reduce(
                (accumulator, currentValue) => ({
                  ...accumulator,
                  ...currentValue,
                }),
                {}
              );

              setCourseData(newCourseData);
              console.log("courseData:", newCourseData);
            } else {
              setFireBaseData([]);
              setCourseData({});
            }
          });
        } else {
          setFireBaseData([]);
          setCourseData({});
        }
      } else {
        // User is not logged in, handle accordingly
        setFireBaseData([]);
        setCourseData({});
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, [currentUser]);

  // mappar ut visualisering och kurserna
  return (
    <>
      <GlobalStyles />
      <Visualisering courseData={courseData} />
      <TitelSOchV>Schema</TitelSOchV>
      <BackToStartLink to="/">
        <BsArrowLeft size={35} />
      </BackToStartLink>
      <HelaSchemaCont>
        <Schema
          FireBaseData={FireBaseData}
          courseData={courseData}
          handleDelete={handleDelete}
          handleMove={handleMove}
        />
      </HelaSchemaCont>
    </>
  );
}
