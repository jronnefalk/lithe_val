import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import getData from "../functions/getData";
import { deleteKurs } from "../firebase_setup/firebase.js";

import { BsTrash3 } from "react-icons/bs";

export function MinSida() {
  const { currentUser } = getAuth();
  const [kursData, setKursData] = useState(
    JSON.parse(localStorage.getItem("kursData")) || []
  );
  const [courseData, setCourseData] = useState(
    JSON.parse(localStorage.getItem("courseData")) || {}
  );

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

  // Count how many courses have utbildningsniva set to 'grundnivå' and 'avancerad'
  const initialCounts = {
    grundniva: 0,
    avancerad: 0,
    hp: 0,
    medieteknik: 0,
    datateknik: 0,
  };

  const counts = Object.values(courseData).reduce((acc, curr) => {
    acc.hp += parseInt(curr.hp);
    console.log(curr.huvudomrade);
    console.log(curr.utbildningsniva);

    if (curr.utbildningsniva === "Grundnivå") {
      acc.grundniva++;
    } else if (curr.utbildningsniva === "Avancerad nivå") {
      acc.avancerad++;
    }
    const countMedieteknik = curr.huvudomrade.filter(
      (item) => item === "Medieteknik"
    ).length;
    acc.medieteknik += countMedieteknik;
    const countDatateknik = curr.huvudomrade.filter(
      (item) => item === "Datateknik"
    ).length;
    acc.datateknik += countDatateknik;

    return acc;
  }, initialCounts);

  return (
    <div>
      <h1>Visualisering</h1>
      <div>
        <p>Grundnivå: {counts.grundniva}</p>
        <p>Avancerad nivå: {counts.avancerad}</p>
        <p>hp: {counts.hp}</p>
        <p>Antal medieteknik: {counts.medieteknik}</p>
        <p>Antal datateknik: {counts.datateknik}</p>
      </div>
      <h1>My Courses</h1>
      <div>
        {kursData.map((kurs) => (
          <div key={kurs.kurskod}>
            <h2>{courseData[kurs.kurskod]?.kursnamn}</h2>
            <p>Kurskod: {kurs.kurskod}</p>
            <p>Block: {courseData[kurs.kurskod]?.block}</p>
            <p>Utbildninganivå: {courseData[kurs.kurskod]?.utbildningsniva}</p>

            <p>
              Huvudområde:{" "}
              {courseData[kurs.kurskod]?.huvudomrade
                ?.join(" ")
                .replace(/(?<=[a-z ])(?=[A-Z])/g, ", ")}
            </p>

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
