import { useState } from "react";

// Data
import kurser from "../webscraping/database.json";

// Funktioner
import filterKurser from "../functions/filterKurser";

// Komponenter
import Kurs from "../components/Kurs";
import Filters from "../components/Filters";

export function Start() {

    const [query, setQuery] = useState("");
    const filteredKurser = filterKurser(kurser, query);

    return (<div className="App">
    <div>
      <input
        placeholder="Sök"
        onChange={(event) => setQuery(event.target.value)}
      />
      <div>
        <Filters />
      </div>
    </div>
    {filteredKurser.map((el) => (
      <Kurs kursdata={el} />
    ))}

  </div>
  );
}