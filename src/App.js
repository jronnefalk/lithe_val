// Externa bibliotek
import React from "react";
import { useState } from "react";
//import { BrowserRouter, Route } from "react-router-dom";

// Data
import kurser from "./webscraping/database.json";

// Funktioner
import filterKurser from "./functions/filterKurser";

// Komponenter
import Signup from "./components/Signup";
import Kurs from "./components/Kurs";
import Filters from "./components/Filters";

// inkoner
import{ BsSearch } from "react-icons/bs";

//design 
import './design/filter.css';
import './design/kurser.css';
import './design/sök.css';

function App() {
  const [query, setQuery] = useState("");
  const filteredKurser = filterKurser(kurser, query);

  return (
    <div className="App">
      <div>
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
      </div>
      {filteredKurser.map((el) => (
        <Kurs kursdata={el} />
      ))}

      <Signup />
    </div>
  );
}

export default App;
