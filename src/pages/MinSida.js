import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import getData from "../functions/getData";
import { deleteKurs, moveKurs } from "../firebase_setup/firebase.js";
import Schema from "../components/Schema";
import Visualisering from "../components/Visualisering";

export function MinSida() {
  // skapar variabler för att spara data i
  const { currentUser } = getAuth();
  // Kursdata innehåller kurser från firebase sparade kurskod och termin där indexen är 0,1,2 osv
  const [FireBaseData, setFireBaseData] = useState(
    JSON.parse(localStorage.getItem("kursData")) || []
  );
  // courseData innehåller alla kursers information från getData() med index i kurskod
  const [courseData, setCourseData] = useState(
    JSON.parse(localStorage.getItem("courseData")) || {}
  );

  // funtioner för att ta bort och flytta kurser
  function handleDelete(kurs) {
    // Remove the kurs from the database
    deleteKurs(kurs);
    // Update the kursData state variable
    setFireBaseData(FireBaseData.filter((k) => k.kurskod !== kurs.kurskod));
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
    if (currentUser) {
      const db = getDatabase();
      const kursRef = ref(db, `users/${currentUser.uid}/Kurser`);

      onValue(kursRef, async (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const kursArray = Object.keys(data).map((key) => ({
            kurskod: key,
            termin: data[key].Termin,
          }));
          setFireBaseData(kursArray);

          // Call getData for each kursKod in kursArray and wait for all the promises to resolve
          const courseDataArray = await Promise.all(
            kursArray.map(async (kurs) => {
              const data = await getData(kurs.kurskod);
              data.termin = kurs.termin;
              return { [kurs.kurskod]: data };
            })
          );

          // Combine all the course data into a single object
          const newCourseData = courseDataArray.reduce(
            (accumulator, currentValue) => ({
              ...accumulator,
              ...currentValue,
            }),
            {}
          );

          setCourseData(newCourseData);

          localStorage.setItem("kursData", JSON.stringify(kursArray));
          localStorage.setItem("courseData", JSON.stringify(newCourseData));
        } else {
          setFireBaseData([]);
          setCourseData({});
          localStorage.removeItem("kursData");
          localStorage.removeItem("courseData");
        }
      });
    }
  }, [currentUser]);

  // mappar ut visualisering och kurserna
  return (
    <>
      <Visualisering courseData={courseData} />
      <h1>My Courses</h1>

      <Schema
        FireBaseData={FireBaseData}
        courseData={courseData}
        handleDelete={handleDelete}
        handleMove={handleMove}
      />
    </>
  );
}
