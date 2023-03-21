import React from "react";
import { saveKurs, deleteKurs} from "../firebase_setup/firebase.js";
import 'firebase/compat/database';


export default function Kurs(props) {
  const kurs = props.kursdata;

  function handleClick() {
    saveKurs(kurs);
  }
  
  function handleDelete(){
    deleteKurs(kurs);
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
      <button onClick={handleClick}>Lägg till kurs</button>
      <button onClick={handleDelete}>Ta bort kurs</button>

    </>
  );
}
