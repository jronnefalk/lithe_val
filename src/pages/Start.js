import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import kurser from "../webscraping/database.json";
import filterKurser from "../functions/filterKurser";
import Kurs from "../components/Kurs";
import Filters from "../components/Filters";
import Test from "../components/Test";

// Ikoner
import { BsSearch } from "react-icons/bs";

//style
import {
  KursCont,
  KursContWrapper,
  Cont,
  SökCont,
} from "../styles/Container.styled";
import { SökText } from "../styles/Text.styled";
import { SökIcont } from "../styles/Knappar.styled";

export function Start() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const filteredKurser = filterKurser(kurser, query, activeFilters);

  useEffect(() => {
    localStorage.setItem("activeFilters", JSON.stringify(activeFilters));
  }, [activeFilters]);

  return (
    <div className="App">
      <SökCont>
        <SökIcont>
          <BsSearch size={12} />
        </SökIcont>
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

      <Test />
    </div>
  );
}
