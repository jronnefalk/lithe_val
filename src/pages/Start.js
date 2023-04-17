import { useState } from "react";
import React from "react";
import { v4 as uuidv4 } from "uuid"; // Key generator for React komponenter

// Data
import kurser from "../webscraping/database.json";
// Funktioner
import filterKurser from "../functions/filterKurser";
// Komponenter
import Kurs from "../components/Kurs";

// inkoner
import { BsSearch } from "react-icons/bs";

//design
import "../design/filter.css";

<<<<<<< Updated upstream
=======
//style
import {
  KursCont,
  KursContWrapper,
  Cont,
  SökCont,
} from "../styles/Container.styled";
import { SökText } from "../styles/Text.styled";
import { SökIcont } from "../styles/Knappar.styled";

>>>>>>> Stashed changes
import Filters from "../components/Filters";

export function Start() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  const filteredKurser = filterKurser(kurser, query, activeFilters);

  return (
    <div className="App">
<<<<<<< Updated upstream
      <div className="container"></div>
      <div className="sök">
        <span className="sök_ikon">
          <BsSearch size={12} />
        </span>
        <input
          className="sök_text"
=======
      <SökCont>
        <SökIcont>
          <BsSearch size={12} />
        </SökIcont>
        <SökText
>>>>>>> Stashed changes
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
