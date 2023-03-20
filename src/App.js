// Externa bibliotek
import React from "react";
import { useState } from "react";
//import { BrowserRouter, Route } from "react-router-dom";

// Data
import kurser from "./webscraping/database.json";

// Funktioner
import filterKurser from "./functions/filterKurser";

// Komponenter
import Signup from "./components/Signup";
import Kurs from "./components/Kurs";
import Filters from "./components/Filters";

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
        <div>
          <Filters />
        </div>
      </div>
      {filteredKurser.map((el) => (
        <Kurs kursdata={el} />
      ))}

      <Signup />
    </div>
  );
}

export default App;

// Hej och hå
