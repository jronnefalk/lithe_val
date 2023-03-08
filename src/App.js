import React from "react";
//import { BrowserRouter, Route } from "react-router-dom";
import kurser from "./webscraping/database.json";
import { useState } from "react";
import Kurs from "./Kurs";
import filterKurser from "./functions/filterKurser";
import Signup from "./components/signup";
import Login from "./components/login";

function App() {
  const [query, setQuery] = useState("");
  const filteredKurser = filterKurser(kurser, query);

  return (
    <div className="App">
      <div>
        <input
          placeholder="Sök"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {filteredKurser.map((kurs) => (
        <Kurs key={kurs.kurskod} kursdata={kurs} />
      ))}

    <Signup/>
    <Login/>

    </div>
  );
}

export default App;
