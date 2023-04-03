import { useState, useEffect } from "react";
import getData from "../functions/getData";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

export function MinSida() {
  const { currentUser } = getAuth();
  const [kursData, setKursData] = useState([]);
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    if (currentUser) {
      const db = getDatabase();
      const kursRef = ref(db, `users/${currentUser.uid}/Kurser`);
      onValue(kursRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const kursArray = Object.keys(data).map((key) => ({
            kursKod: key,
            termin: data[key].Termin,
          }));
          setKursData(kursArray);

          // Call getData for each kursKod in kursArray
          kursArray.forEach(async (kurs) => {
            const courseData = getData(kurs.kursKod);
            console.log(courseData);
            // Do something with courseData, e.g. update state
          });
        } else {
          setKursData([]);
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
            <ul>
              {courseData[kurs.kursKod] &&
                courseData[kurs.kursKod].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
