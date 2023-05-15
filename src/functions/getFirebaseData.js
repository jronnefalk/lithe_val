import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import getData from "../functions/getData";
import { database } from "../firebase_setup/firebase.js";

export const useFirebaseData = () => {
  const { currentUser } = getAuth();
  const [FireBaseData, setFireBaseData] = useState([]);
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    if (currentUser) {
      const kursRef = ref(database, `users/${currentUser.uid}/Kurser`);
      const unsubscribe = onValue(kursRef, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const kursArray = Object.keys(data).map((key) => ({
            kurskod: key,
            termin: data[key].Termin,
          }));
          setFireBaseData(kursArray);
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
        } else {
          setFireBaseData([]);
          setCourseData({});
        }
      });

      return () => unsubscribe();
    } else {
      setFireBaseData([]);
      setCourseData({});
    }
  }, [currentUser]);

  return { FireBaseData, setFireBaseData, courseData, setCourseData };
};

export default useFirebaseData;
