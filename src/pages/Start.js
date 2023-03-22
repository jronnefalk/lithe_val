import { useState } from "react";

// Data
import kurser from "../webscraping/database.json";

// Funktioner
import filterKurser from "../functions/filterKurser";

// Komponenter
import Kurs from "../components/Kurs";
import Filters from "../components/Filters";

// inkoner
import{ BsSearch } from "react-icons/bs";

//design 
import '../design/filter.css';
import '../design/kurser.css';
import '../design/sök.css';


export function Start() {

    const [query, setQuery] = useState("");
    const filteredKurser = filterKurser(kurser, query);

    return (<div className="App">
     
      <div className="sök">
        <span className="sök_ikon"><BsSearch size={12}/></span>
      <input className="sök_text" 
        type="text"
        placeholder= "Sök"
        onChange={(event) => setQuery(event.target.value)}
      />
      </div>
      <div className="filter">
        <p>Filter</p>
        <Filters />
      </div>
      
    
    {filteredKurser.map((el) => (
      <Kurs kursdata={el} />
    ))}

  </div>
  );
}