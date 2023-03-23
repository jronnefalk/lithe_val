import React, { useState } from "react";

export default function Kurs(props) {
  const kurs = props.kursdata;

  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <>
      <h1 className="kursnamn">{kurs.kursnamn}</h1>
      <h2 className="kursinfo">
        <p>Kurskod: {kurs.kurskod}</p>
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
        <p>
          Huvudområde:{" "}
          {kurs.huvudomrade.map((prop) => {
            return <p>{prop}</p>;
          })}
        </p>

        <p>Utbildningsnivå: {kurs.utbildningsniva}</p>

        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "Läs mindre" : " Läs mer"}
        </span>

        {isReadMore && <p>HP: {kurs.hp}</p>}
        {isReadMore && <p>Ort: {kurs.ort}</p>}
        {isReadMore && <a href={kurs.url}>Kurshemsida</a>}
      </h2>
    </>
  );
}
