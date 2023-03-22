import React from "react";

export default function Kurs(props) {
  const kurs = props.kursdata;
  return (
    <>
      <h1>{kurs.kursnamn}</h1>
      <p>Kurskod: {kurs.kurskod}</p>
      <p>HP: {kurs.hp}</p>
      <p>
        Huvudområde:{" "}
        {kurs.huvudomrade.map((prop) => {
          return <p>{prop}</p>;
        })}
      </p>
      <p>Utbildningsnivå: {kurs.utbildningsniva}</p>
      <p>Termin: {kurs.termin}</p>
      <p>
        Period:{" "}
        {kurs.period.map((prop) => {
          return <p>{prop}</p>;
        })}
      </p>
      <p>
        Block:{" "}
        {kurs.block.map((prop) => {
          return <p>{prop}</p>;
        })}
      </p>
      <p>Ort: {kurs.ort}</p>
      <a href={kurs.url}>Kurshemsida</a>
    </>
  );
}
