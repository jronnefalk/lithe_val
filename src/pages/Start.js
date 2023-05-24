import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import kurser from "../webscraping/database.json";
import filterKurser from "../functions/filterKurser";
import Kurs from "../components/Kurs";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";

// Ikoner
import { BsSearch } from "react-icons/bs";

//style
import {
  KursCont,
  KursContWrapper,
  Cont,
  SökCont,
  Filter,
  SökochTextCont,
} from "../styles/Container.styled";
import { SökText, AntalSökResultat } from "../styles/Text.styled";
import { SökIcont } from "../styles/Knappar.styled";
import { GlobalStyles } from "../styles/General.styled";
import { BackToTopButton } from "../styles/Knappar.styled";
import { BsArrowUpSquareFill } from "react-icons/bs";

import styled from "styled-components";
import { icons } from "react-icons";

export function Start() {
  const [query, setQuery] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [activeFilters, setActiveFilters] = useState(
    JSON.parse(sessionStorage.getItem("activeFilters")) || []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10); // Number of items per page

  const filteredKurser = filterKurser(kurser, query, activeFilters);
  const totalPages = Math.ceil(filteredKurser.length / perPage);

  useEffect(() => {
    sessionStorage.setItem("activeFilters", JSON.stringify(activeFilters));
  }, [activeFilters]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentCourses = filteredKurser.slice(startIndex, endIndex);

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
              placeholder="Sök kursnamn eller kurskod"
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
              <AntalSökResultat>
                Visar {currentCourses.length} av {filteredKurser.length}{" "}
                sökträffar
              </AntalSökResultat>
              {currentCourses.map((kurs) => (
                <KursCont key={uuidv4()}>
                  <Kurs key={uuidv4()} kursdata={kurs} />
                </KursCont>
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </KursContWrapper>
          </div>
        </Cont>
        {showButton && (
          <BackToTopButton onClick={handleBackToTop}>
            <BsArrowUpSquareFill size={35} />
          </BackToTopButton>
        )}
      </div>
    </>
  );
}
