import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import kurser from "../webscraping/database.json";
import filterKurser from "../functions/filterKurser";
import Kurs from "../components/Kurs";
import Filters from "../components/Filters";

import { BsSearch } from "react-icons/bs";

import "../design/filter.css";
import "../design/kurser.css";
import "../design/sök.css";

export function Start() {
  const [query, setQuery] = useState("");

  // Sparar filtervalen mha local storage
  const [activeFilters, setActiveFilters] = useState(
    JSON.parse(localStorage.getItem("activeFilters")) || []
  );
  const filteredKurser = filterKurser(kurser, query, activeFilters);

  useEffect(() => {
    localStorage.setItem("activeFilters", JSON.stringify(activeFilters));
  }, [activeFilters]);

  return (
    <div className="App">
      <div className="container"></div>
      <div className="sök">
        <span className="sök_ikon">
          <BsSearch size={12} />
        </span>
        <input
          className="sök_text"
          type="text"
          placeholder="Sök"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="container">
        <Filters
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
        <div className="course-container-wrapper">
          {filteredKurser.map((kurs) => (
            <div key={uuidv4()} className="course-container">
              <Kurs key={uuidv4()} kursdata={kurs} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
