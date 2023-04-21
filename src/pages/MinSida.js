import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import getData from "../functions/getData";
import { deleteKurs, moveKurs } from "../firebase_setup/firebase.js";

import { BsTrash3 } from "react-icons/bs";

export function MinSida() {
  // skapar variabler för att spara data i
  const { currentUser } = getAuth();
  // Kursdata innehåller kurser från firebase sparade kurskod och termin där indexen är 0,1,2 osv
  const [kursData, setKursData] = useState(
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
    setKursData(kursData.filter((k) => k.kurskod !== kurs.kurskod));
  }
  function handleMove(kurs) {
    const availableTerms = Object.values(getData(kurs.kurskod).termin).filter(
      (term) => term !== courseData[kurs.kurskod]?.termin
    );

    if (availableTerms.length > 0) {
      moveKurs(kurs, availableTerms[0]);
      const newTerm = availableTerms[0];
      const updatedKursData = [...kursData];
      const index = updatedKursData.findIndex(
        (k) => k.kurskod === kurs.kurskod
      );
      updatedKursData[index] = { ...kurs, termin: newTerm };

      setKursData(updatedKursData);
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
          setKursData(kursArray);

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
  // Visualisering beräkning
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

  // mappar ut visualisering och kurserna
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
        {[7, 8, 9].map((termin) => (
          <div key={termin}>
            <h2 style={{ color: "blue" }}>Termin {termin}</h2>
            {[1, 2].map((period) => (
              <div key={period}>
                <h3 style={{ color: "green" }}>Period {period}</h3>
                {kursData
                  .filter(
                    (kurs) =>
                      courseData[kurs.kurskod]?.termin === String(termin) &&
                      (String(courseData[kurs.kurskod]?.period[0]) ===
                        String(period) ||
                        String(courseData[kurs.kurskod]?.period[1]) ===
                          String(period))
                  )
                  .map((kurs) => (
                    <div key={kurs.kurskod}>
                      <h4>{courseData[kurs.kurskod]?.kursnamn}</h4>
                      <p>Kurskod: {kurs.kurskod}</p>
                      <p>Block: {courseData[kurs.kurskod]?.block}</p>
                      <p>
                        Utbildninganivå:{" "}
                        {courseData[kurs.kurskod]?.utbildningsniva}
                      </p>
                      <p>termin: {courseData[kurs.kurskod]?.termin}</p>
                      <p>period: {courseData[kurs.kurskod]?.period}</p>
                      <p>
                        Huvudområde:{" "}
                        {courseData[kurs.kurskod]?.huvudomrade
                          ?.join(" ")
                          .replace(/(?<=[a-z ])(?=[A-Z])/g, ", ")}
                      </p>

                      <button // delete knapp
                        className="Lägg-till-knapp"
                        onClick={() => handleDelete(kurs)}
                      >
                        {" "}
                        <BsTrash3 size={20} />
                        <p>Ta bort kurs</p>
                      </button>

                      {termin !== 8 && (
                        <button // om terminen inte är 8 visas flytta-knappen
                          className="Lägg-till-knapp"
                          onClick={() => handleMove(kurs)}
                        >
                          Flytta kurs från termin{" "}
                          {courseData[kurs.kurskod]?.termin} till termin
                          {Object.values(getData(kurs.kurskod).termin)
                            .filter(
                              (term) =>
                                term !== courseData[kurs.kurskod]?.termin
                            )
                            .map((term) => (
                              <span key={term}>{term} </span>
                            ))}
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
