import React from "react";
import kurser from "./webscraping/database.json";
import {useState} from "react";


function App() {
  const [query, setQuery] = useState("")
  return (
    
    <div className="App">
         <div>
         <input placeholder="Sök" onChange={event => setQuery(event.target.value)} />
    </div>
    {kurser.filter(kurs => {
    if (query === '') {
      return kurs;
    } else if (kurs.kursnamn.toLowerCase().includes(query.toLowerCase())) {
      return kurs;
    } else if(kurs.kurskod.toLowerCase().includes(query.toLowerCase())) {
      return kurs;}
  })
.map((kurs) => (
        <div className="box" key={kurs.id}>
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
          </div>
      ))}
    </div>
  );
}

export default App;
