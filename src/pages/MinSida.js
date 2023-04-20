import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import getData from "../functions/getData";
import { deleteKurs } from "../firebase_setup/firebase.js";

import { BsTrash3 } from "react-icons/bs";

//Style
import { Progressbar } from "../styles/Visualiseringar.styled";
import { RubrikProgressbar } from "../styles/Text.styled";
import { Progressbarochrubrik } from "../styles/Visualiseringar.styled";
import { Cirkel } from "../styles/Visualiseringar.styled";
import { Cirkelochrubrik } from "../styles/Visualiseringar.styled";
import { CirkelRubrikMinakurser } from "../styles/Visualiseringar.styled";

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

    if (curr.utbildningsniva === "Grundnivå") {
      acc.grundniva++;
    } else if (curr.utbildningsniva === "Avancerad nivå") {
      acc.avancerad++;
    }
    const countMedieteknik =
      (curr.huvudomrade &&
        curr.huvudomrade.filter((item) => item === "Medieteknik").length) ||
      0;
    acc.medieteknik += countMedieteknik;
    const countDatateknik =
      (curr.huvudomrade &&
        curr.huvudomrade.filter((item) => item === "Datateknik").length) ||
      0;
    acc.datateknik += countDatateknik;

    return acc;
  }, initialCounts);

  const totalStudents = counts.grundniva + counts.avancerad;
  const avanceradPercent = Math.round(counts.avancerad);
  const medieteknikPercent = Math.round(counts.medieteknik);
  const datateknikPercent = Math.round(counts.datateknik);
  const hpPercent = Math.round(counts.hp);

  return (
    <>
      <h1>Visualisering</h1>

      <Progressbarochrubrik>
        <RubrikProgressbar>
          Avancerade kurser: {counts.avancerad}
        </RubrikProgressbar>
        <Progressbar value={avanceradPercent} max="10"></Progressbar>
        <RubrikProgressbar>
          Poäng inom medieteknik: {counts.medieteknik}
        </RubrikProgressbar>
        <Progressbar value={medieteknikPercent} max="6"></Progressbar>
        <RubrikProgressbar>
          Poäng inom datateknik: {counts.datateknik}
        </RubrikProgressbar>
        <Progressbar value={datateknikPercent} max="6"></Progressbar>
      </Progressbarochrubrik>

      <CirkelRubrikMinakurser>
        <RubrikProgressbar>Totalt antal hp: {counts.hp}</RubrikProgressbar>
        <Cirkel value={hpPercent} max="90"></Cirkel>

        <h1>Mina kurser</h1>
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
      </CirkelRubrikMinakurser>
    </>
  );
}
