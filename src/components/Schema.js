import React from "react";
import getData from "../functions/getData";
//Iconer
import { BsTrash3 } from "react-icons/bs";

export default function Schema(props) {
  return (
    <>
      {props.FireBaseData.length > 0 &&
        [7, 8, 9].map((termin) => (
          <div key={termin}>
            <h2 style={{ color: "blue" }}>Termin {termin}</h2>
            {[1, 2].map((period) => (
              <div key={period}>
                <h3 style={{ color: "green" }}>Period {period}</h3>
                {props.FireBaseData.filter(
                  (kurs) =>
                    props.courseData[kurs.kurskod]?.termin === String(termin) &&
                    (String(props.courseData[kurs.kurskod]?.period[0]) ===
                      String(period) ||
                      String(props.courseData[kurs.kurskod]?.period[1]) ===
                        String(period))
                ).map((kurs) => (
                  <div key={kurs.kurskod}>
                    <h4>{props.courseData[kurs.kurskod]?.kursnamn}</h4>
                    <p>Kurskod: {kurs.kurskod}</p>
                    <p>Block: {props.courseData[kurs.kurskod]?.block}</p>
                    <p>
                      Utbildninganivå:{" "}
                      {props.courseData[kurs.kurskod]?.utbildningsniva}
                    </p>
                    <p>termin: {props.courseData[kurs.kurskod]?.termin}</p>
                    <p>period: {props.courseData[kurs.kurskod]?.period}</p>
                    <p>
                      Huvudområde:{" "}
                      {props.courseData[kurs.kurskod]?.huvudomrade
                        ?.join(" ")
                        .replace(/(?<=[a-z ])(?=[A-Z])/g, ", ")}
                    </p>

                    <button // delete knapp
                      className="Lägg-till-knapp"
                      onClick={() => props.handleDelete(kurs)}
                    >
                      {" "}
                      <BsTrash3 size={20} />
                      <p>Ta bort kurs</p>
                    </button>

                    {termin !== 8 && (
                      <button // om terminen inte är 8 visas flytta-knappen
                        className="Lägg-till-knapp"
                        onClick={() => props.handleMove(kurs)}
                      >
                        Flytta kurs från termin{" "}
                        {props.courseData[kurs.kurskod]?.termin} till termin
                        {Object.values(getData(kurs.kurskod).termin)
                          .filter(
                            (term) =>
                              term !== props.courseData[kurs.kurskod]?.termin
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
    </>
  );
}
