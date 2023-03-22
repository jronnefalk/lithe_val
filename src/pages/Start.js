import { useState, useEffect } from "react";
//import { BrowserRouter, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Key generator for React komponenter

// Data
import kurser from "../webscraping/database.json";
import filterKurser from "../functions/filterKurser";
import Kurs from "../components/Kurs";
//import Filters from "./components/Filters";

import React from "react";

export function Start() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  const filters = [
    { label: "Period 1", key: "period", value: "1" },
    { label: "Period 2", key: "period", value: "2" },
    { label: "Block 1", key: "block", value: "1" },
    { label: "Block 2", key: "block", value: "2" },
    { label: "Block 3", key: "block", value: "3" },
  ];

  // Funktion som hanterar när användaren klickar på ett filter
  const handleFilterChange = (filter) => {
    if (activeFilters.includes(filter)) {
      // Om filter redan är aktiverat, ta bort det
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      // Om filter inte är aktiverat, aktivera det
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Logga aktiva filter i konsolen (DEBUG)
  useEffect(() => {
    console.log(activeFilters);
  }, [activeFilters]);

  const filteredKurser = filterKurser(kurser, query, activeFilters);

  return (
    <div className="App">
      <div>
        <input
          placeholder="Sök"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div>
        {filters.map((filter) => (
          <label key={uuidv4()}>
            <input
              type="checkbox"
              onChange={() => handleFilterChange(filter)}
              checked={activeFilters.includes(filter)}
            />
            {filter.label}
          </label>
        ))}
     <div/>
     <div>
        {filteredKurser.map((kurs) => (
          <Kurs key={uuidv4()} kursdata={kurs} />
        ))}
      </div>
    </div>
  );
}