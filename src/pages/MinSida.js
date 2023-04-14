import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import getData from "../functions/getData";
import { deleteKurs } from "../firebase_setup/firebase.js";

import { BsTrash3 } from "react-icons/bs";

export function MinSida() {
  const { currentUser } = getAuth();
  const [kursData, setKursData] = useState([]);
  const [courseData, setCourseData] = useState({});

  function handleDelete(kurs) {
    deleteKurs(kurs);
  }

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
          setKursData(kursArray);

          // Call getData for each kursKod in kursArray and wait for all the promises to resolve
          const courseDataArray = await Promise.all(
            kursArray.map(async (kurs) => {
              const data = await getData(kurs.kurskod);

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
        } else {
          setKursData([]);
          setCourseData({});
        }
      });
    }
  }, [currentUser]);

  return (
    <div>
      <h1>My Courses</h1>
      <div>
        {kursData.map((kurs) => (
          <div key={kurs.kurskod}>
            <h2>{courseData[kurs.kurskod]?.kursnamn}</h2>
            <p>Kurskod: {kurs.kurskod}</p>
            <p>Block: {courseData[kurs.kurskod]?.block}</p>
            <button
              className="Lägg-till-knapp"
              onClick={() => handleDelete(kurs)}
            >
              {" "}
              <BsTrash3 size={20} />
              <p>Ta bort kurs</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
