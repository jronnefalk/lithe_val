import React from "react";
import { v4 as uuidv4 } from "uuid"; // Key generator for React komponenter

import "../design/filter.css";

export default function Filters({ activeFilters, setActiveFilters }) {
  const filters = [
    { label: "Block 1", key: "block", value: "1" },
    { label: "Block 2", key: "block", value: "2" },
    { label: "Block 3", key: "block", value: "3" },
    { label: "Block 4", key: "block", value: "4" },
    { label: "Termin 7", key: "termin", value: "7" },
    { label: "Termin 8", key: "termin", value: "8" },
    { label: "Termin 9", key: "termin", value: "9" },
    {
      label: "Avancerad nivå bitch",
      key: "utbildningsniva",
      value: "Avancerad nivå",
    },
    { label: "Grundnivå bitch", key: "utbildningsniva", value: "Grundnivå" },

    { label: "Medieteknik", key: "huvudomrade", value: "Medieteknik" },
    { label: "Datateknik", key: "huvudomrade", value: "Datateknik" },

    { label: "Norrköping", key: "ort", value: "Norrköping" },
    { label: "Linköping", key: "ort", value: "Linköping" },
    { label: "Period 1", key: "period", value: "1" },
    { label: "Period 2", key: "period", value: "2" },
    { label: "Tentamen", key: "examination", value: "tentamen" },
  ];

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
    <div className="filter">
      {filters.map((filter) => (
        <label key={uuidv4()}>
          <input
            type="checkbox"
            onChange={() => handleFilterChange(filter)}
            checked={activeFilters.some(
              (f) => f.key === filter.key && f.value === filter.value
            )}
          />
          {filter.label}
        </label>
      ))}
    </div>
  );
}
