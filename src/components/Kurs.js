import React, { useState } from "react";
import { saveKurs, deleteKurs } from "../firebase_setup/firebase.js";
import "firebase/compat/database";
//import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
export default function Kurs(props) {
  const kurs = props.kursdata;
  //const auth = getAuth();

  const [addkurs, exists] = useState(false);

  function handleClick() {
    saveKurs(kurs);
    exists(true);
  }

  function handleDelete() {
    deleteKurs(kurs);
    exists(false);
  }

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
      <p>Termin:{kurs.termin}</p>
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

      {!addkurs && <button onClick={handleClick}>Lägg till kurs</button>}
      {addkurs === true && <button onClick={handleDelete}>Ta bort kurs</button>}
    </>
  );
}
