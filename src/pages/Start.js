import { useState, useCallback } from "react";
import kurser from "../webscraping/database.json";
import filterKurser from "../functions/filterKurser";
import Kurs from "../components/Kurs";
import Filters from "../components/Filters";

export function Start() {
  const [query, setQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSelectFilter = useCallback((filter, value) => {
    setSelectedFilters((prevFilters) => {
      const filters = [...prevFilters];
      const index = filters.findIndex((f) => f.name === filter);
      if (index === -1) {
        filters.push({ name: filter, value });
      } else {
        filters[index].value = value;
      }
      return filters;
    });
  }, []);

  const filteredKurser = filterKurser(kurser, query, selectedFilters);

  return (
    <div className="App">
      <div>
        <input
          placeholder="Sök"
          onChange={(event) => setQuery(event.target.value)}
        />
        <div>
          <Filters onSelectFilter={handleSelectFilter} />
        </div>
      </div>
      {filteredKurser.length > 0
        ? filteredKurser.map((el) => <Kurs kursdata={el} key={el.kurskod} />)
        : kurser.map((el) => <Kurs kursdata={el} key={el.kurskod} />)}
    </div>
  );
}
