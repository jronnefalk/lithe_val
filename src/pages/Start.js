import { useState } from "react";
import React from "react";

import { Link } from "react-router-dom";
// Data
import kurser from "../webscraping/database.json";
// Funktioner
import filterKurser from "../functions/filterKurser";
// Komponenter
import Kurs from "../components/Kurs";
import Filters from "../components/Filters";
import GoogleAuth from "../components/signup";

export function Start() {
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
        <Kurs key={el.kurskod} kursdata={el} />
      ))}

      <GoogleAuth />

      <Link to="/minasidor">
        <button>Gå till Mina Sidor</button>
      </Link>
    </div>
  );
}
