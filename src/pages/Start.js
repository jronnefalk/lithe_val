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
import "../design/kurser.css";
import "../design/sök.css";

//style
import {
  KursCont,
  KursContWrapper,
  Cont,
  SökCont,
} from "../styles/Container.styled";
import { SökText } from "../styles/Text.styled";
import Filters from "../components/Filters";

export function Start() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  const filteredKurser = filterKurser(kurser, query, activeFilters);

  return (
    <div className="App">
      <SökCont>
        <span className="sök_ikon">
          <BsSearch size={12} />
        </span>
        <SökText
          type="text"
          placeholder="Sök"
          onChange={(event) => setQuery(event.target.value)}
        />
      </SökCont>

      <Cont>
        <Filters
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
        <KursContWrapper>
          {filteredKurser.map((kurs) => (
            <KursCont key={uuidv4()}>
              <Kurs key={uuidv4()} kursdata={kurs} />
            </KursCont>
          ))}
        </KursContWrapper>
      </Cont>
    </div>
  );
}
