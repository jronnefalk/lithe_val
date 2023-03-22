import React from "react";
import { v4 as uuidv4 } from "uuid"; // Key generator for React komponenter

export default function Kurs(props) {
  const kurs = props.kursdata;
  return (
    <>
      <h1>{kurs.kursnamn}</h1>
      <p>Kurskod: {kurs.kurskod}</p>
      <p>HP: {kurs.hp}</p>
      <div>
        Huvudområde:{" "}
        {kurs.huvudomrade.map((prop) => {
          return <p key={uuidv4()}>{prop}</p>;
        })}
      </div>
      <p>Utbildningsnivå: {kurs.utbildningsniva}</p>
      <p>Termin: {kurs.termin}</p>
      <div>
        Period:{" "}
        {kurs.period.map((prop) => {
          return <p key={uuidv4()}>{prop}</p>;
        })}
      </div>
      <div>
        Block:{" "}
        {kurs.block.map((prop) => {
          return <p key={uuidv4()}>{prop}</p>;
        })}
      </div>
      <p>Ort: {kurs.ort}</p>
      <a href={kurs.url}>Kurshemsida</a>
    </>
  );
}
