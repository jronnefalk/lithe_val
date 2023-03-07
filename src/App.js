import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import kurser from "./webscraping/database.json";
import Signup from "./components/signup.js";

function App() {
  return (
     <div className="App">
      {kurser.map((kurs) => (
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
        </>
      ))}
    </div>
  );
}

export default App;
