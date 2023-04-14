import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import getData from "../functions/getData";

export function MinSida() {
  const { currentUser } = getAuth();
  const [kursData, setKursData] = useState(
    JSON.parse(localStorage.getItem("kursData")) || []
  );
  const [courseData, setCourseData] = useState(
    JSON.parse(localStorage.getItem("courseData")) || {}
  );

  useEffect(() => {
    if (currentUser) {
      const db = getDatabase();
      const kursRef = ref(db, `users/${currentUser.uid}/Kurser`);

      onValue(kursRef, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const kursArray = Object.keys(data).map((key) => ({
            kursKod: key,
            termin: data[key].Termin,
          }));
          setKursData(kursArray);

          // Call getData for each kursKod in kursArray and wait for all the promises to resolve
          const courseDataArray = await Promise.all(
            kursArray.map(async (kurs) => {
              const data = await getData(kurs.kursKod);
              return { [kurs.kursKod]: data };
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
          setKursData([]);
          setCourseData({});
          localStorage.removeItem("kursData");
          localStorage.removeItem("courseData");
        }
      });
    }
  }, [currentUser]);

  return (
    <div>
      <h1>My Courses</h1>
      <div>
        {kursData.map((kurs) => (
          <div key={kurs.kursKod}>
            <h2>{courseData[kurs.kursKod]?.kursnamn}</h2>
            <p>Kurskod: {kurs.kursKod}</p>
            <p>Block: {courseData[kurs.kursKod]?.block}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
