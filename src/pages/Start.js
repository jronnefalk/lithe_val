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
