import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import kurser from "../webscraping/database.json";
import filterKurser from "../functions/filterKurser";
import Kurs from "../components/Kurs";
import Filters from "../components/Filters";

// Ikoner
import { BsSearch } from "react-icons/bs";

//style
import {
  KursCont,
  KursContWrapper,
  Cont,
  SökCont,
  Filter,
} from "../styles/Container.styled";
import { SökText } from "../styles/Text.styled";
import { SökIcont } from "../styles/Knappar.styled";
import { GlobalStyles } from "../styles/General.styled";
import styled from "styled-components";

export function Start() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const filteredKurser = filterKurser(kurser, query, activeFilters);

  useEffect(() => {
    localStorage.setItem("activeFilters", JSON.stringify(activeFilters));
    // Filtret, en påbörjad övergång mellan fixed och absolute
    /** 
    const filter = document.querySelector(".filter");
    const filterTop = filter.getBoundingClientRect().top;

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > filterTop) {
        filter.style.position = "fixed";
      } else {
        filter.style.position = "absolute";
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };

    */
  }, [activeFilters]);

  return (
    <>
      <div className="App">
        <GlobalStyles />
        <Cont>
          <div></div>

          <SökCont>
            <SökIcont>
              <BsSearch size={12} />
            </SökIcont>
            <SökText
              type="text"
              placeholder="Sök Kursnamn eller Kurskod"
              onChange={(event) => setQuery(event.target.value)}
            />
          </SökCont>

          <Filter className="filter">
            <Filters
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
          </Filter>

          <div style={{}}>
            <KursContWrapper>
              {filteredKurser.map((kurs) => (
                <KursCont key={uuidv4()}>
                  <Kurs key={uuidv4()} kursdata={kurs} />
                </KursCont>
              ))}
            </KursContWrapper>
          </div>
        </Cont>
      </div>
    </>
  );
}
