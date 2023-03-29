import React, { useState } from "react";
import { saveKurs, deleteKurs } from "../firebase_setup/firebase.js";
import "firebase/compat/database";
//import { getAuth } from "firebase/auth";
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
      <p>Huvudområde: {kurs.huvudomrade[0]}</p>
      <p>Utbildningsnivå: {kurs.utbildningsniva}</p>
      <p>Termin: {kurs.termin}</p>
      <p>Period: {kurs.period[0]}</p>
      <p>Block: {kurs.block[0]}</p>
      <p>Ort: {kurs.ort}</p>
      <a href={kurs.url}>Kurshemsida</a>

      {!addkurs && <button onClick={handleClick}>Lägg till kurs</button>}
      {addkurs === true && <button onClick={handleDelete}>Ta bort kurs</button>}
    </>
  );
}
