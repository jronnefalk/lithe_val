import React from "react";
import { v4 as uuidv4 } from "uuid"; // Key generator for React komponenter

// Style (text)
import {
  FilterHeader,
  FilterText,
  InfoTitel,
  FilterTextBlock,
} from "../styles/Text.styled.js";

//Style (container)
import { FilterCont, FilterBlock } from "../styles/Container.styled";

//Style (knappar)
//import { BlockInput } from "../styles/Knappar.styled";

export default function Filters({ activeFilters, setActiveFilters }) {
  const filters = [
    { label: "1", key: "block", value: "1" },
    { label: "2", key: "block", value: "2" },
    { label: "3", key: "block", value: "3" },
    { label: "4", key: "block", value: "4" },
    { label: "Termin 7", key: "termin", value: "7" },
    { label: "Termin 8", key: "termin", value: "8" },
    { label: "Termin 9", key: "termin", value: "9" },
    { label: "Helfart", key: "studietakt", value: "helfart" },
    { label: "Halvfart", key: "studietakt", value: "halvfart" },
    {
      label: "Avancerad nivå",
      key: "utbildningsniva",
      value: "Avancerad nivå",
    },
    { label: "Grundnivå", key: "utbildningsniva", value: "Grundnivå" },

    { label: "Medieteknik", key: "huvudomrade", value: "Medieteknik" },
    { label: "Datateknik", key: "huvudomrade", value: "Datateknik" },

    { label: "Norrköping", key: "ort", value: "Norrköping" },
    { label: "Linköping", key: "ort", value: "Linköping" },
    { label: "Period 1", key: "period", value: "1" },
    { label: "Period 2", key: "period", value: "2" },
    { label: "Tentamen", key: "examination", value: "tentamen" },
    { label: "Laboration", key: "examination", value: "laboration" },
    { label: "Projekt", key: "examination", value: "projekt" },
  ];

  // Gruppera filter-objekt med avseende på key
  const blocks = filters.filter((filter) => filter.key === "block");
  const terminer = filters.filter((filter) => filter.key === "termin");
  const studietakt = filters.filter((filter) => filter.key === "studietakt");
  const utbildningsnivaer = filters.filter(
    (filter) => filter.key === "utbildningsniva"
  );
  const huvudomraden = filters.filter((filter) => filter.key === "huvudomrade");
  const orter = filters.filter((filter) => filter.key === "ort");
  const perioder = filters.filter((filter) => filter.key === "period");
  const examination = filters.filter((filter) => filter.key === "examination");
  // Funktion som hanterar när användaren klickar på ett filter
  const handleFilterChange = (filter) => {
    if (
      activeFilters.some(
        (f) => f.key === filter.key && f.value === filter.value
      )
    ) {
      // Om filter redan är aktiverat, ta bort det
      setActiveFilters(
        activeFilters.filter(
          (f) => !(f.key === filter.key && f.value === filter.value)
        )
      );
    } else {
      // Om filter inte är aktiverat, aktivera det
      setActiveFilters([...activeFilters, filter]);
    }
  };

  return (
    <FilterCont>
      <InfoTitel> Filtrera </InfoTitel>
      <FilterHeader> Block </FilterHeader>

      <FilterBlock>
        {blocks.map((filter) => (
          <FilterTextBlock key={uuidv4()}>
            <input
              type="checkbox"
              onChange={() => handleFilterChange(filter)}
              checked={activeFilters.some(
                (f) => f.key === filter.key && f.value === filter.value
              )}
            />
            {filter.label}
          </FilterTextBlock>
        ))}
      </FilterBlock>

      <FilterHeader> Period </FilterHeader>
      {perioder.map((filter) => (
        <FilterText key={uuidv4()}>
          <input
            type="checkbox"
            onChange={() => handleFilterChange(filter)}
            checked={activeFilters.some(
              (f) => f.key === filter.key && f.value === filter.value
            )}
          />
          {filter.label}
        </FilterText>
      ))}
      <FilterHeader> Termin </FilterHeader>
      {terminer.map((filter) => (
        <FilterText key={uuidv4()}>
          <input
            type="checkbox"
            onChange={() => handleFilterChange(filter)}
            checked={activeFilters.some(
              (f) => f.key === filter.key && f.value === filter.value
            )}
          />
          {filter.label}
        </FilterText>
      ))}
      <FilterHeader> Studietakt </FilterHeader>
      {studietakt.map((filter) => (
        <FilterText key={uuidv4()}>
          <input
            type="checkbox"
            onChange={() => handleFilterChange(filter)}
            checked={activeFilters.some(
              (f) => f.key === filter.key && f.value === filter.value
            )}
          />
          {filter.label}
        </FilterText>
      ))}
      <FilterHeader> Kursnivå </FilterHeader>
      {utbildningsnivaer.map((filter) => (
        <FilterText key={uuidv4()}>
          <input
            type="checkbox"
            onChange={() => handleFilterChange(filter)}
            checked={activeFilters.some(
              (f) => f.key === filter.key && f.value === filter.value
            )}
          />
          {filter.label}
        </FilterText>
      ))}
      <FilterHeader> Huvudområde </FilterHeader>
      {huvudomraden.map((filter) => (
        <FilterText key={uuidv4()}>
          <input
            type="checkbox"
            onChange={() => handleFilterChange(filter)}
            checked={activeFilters.some(
              (f) => f.key === filter.key && f.value === filter.value
            )}
          />
          {filter.label}
        </FilterText>
      ))}
      <FilterHeader> Examination </FilterHeader>
      {examination.map((filter) => (
        <FilterText key={uuidv4()}>
          <input
            type="checkbox"
            onChange={() => handleFilterChange(filter)}
            checked={activeFilters.some(
              (f) => f.key === filter.key && f.value === filter.value
            )}
          />
          {filter.label}
        </FilterText>
      ))}
      <FilterHeader> Plats </FilterHeader>
      {orter.map((filter) => (
        <FilterText key={uuidv4()}>
          <input
            type="checkbox"
            onChange={() => handleFilterChange(filter)}
            checked={activeFilters.some(
              (f) => f.key === filter.key && f.value === filter.value
            )}
          />
          {filter.label}
        </FilterText>
      ))}
    </FilterCont>
  );
}
