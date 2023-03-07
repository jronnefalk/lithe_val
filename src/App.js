import React from "react";
import kurser from "./webscraping/database.json";
import { useState } from "react";
import Kurs from "./Kurs";
import filterKurser from "./functions/filterKurser";

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
    </div>
  );
}

export default App;
