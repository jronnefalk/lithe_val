import React from "react";

export default function Kurs(props) {
  const kurs = props.kursdata;
  return (
    <>
      <div className="kursinfo">
      <h1 class="kursnamn">{kurs.kursnamn}</h1>
      <p class= "firstheader">
      <p>|</p>
      <p>{kurs.kurskod} </p>
      <p>|</p>
      <p> Termin {kurs.termin} </p>
      <p>|</p>
      <p>
         Period {" "}
        {kurs.period.map((prop) => {
          return <span>{prop}</span>;
        })} 
      </p>
      <p>|</p>
      <p>
         Block {" "}
        {kurs.block.map((prop) => {
          return <span>{prop}</span>;
        })} 
      </p>
      <p>|</p>
      </p>
      <p class="secondheader">
      <p> {kurs.utbildningsniva} </p>
      <p> 
        {" "}
        {kurs.huvudomrade.map((prop) => {
          return <span>{prop} </span>;
        })}
      </p>
      </p>
      <p>HP: {kurs.hp}</p>
      <p>Ort: {kurs.ort}</p>

      <a href={kurs.url}>Kurshemsida</a>
      </div>
      
    </>
  );
}
