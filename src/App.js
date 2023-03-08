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
import Checkbox from "./components/Checkbox";

function App() {
  const [query, setQuery] = useState("");
  const filteredKurser = filterKurser(kurser, query);

  const [checkedOne, setCheckedOne] = React.useState(false);
  const [checkedTwo, setCheckedTwo] = React.useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };

  return (
    <div className="App">
      <div>
        <input
          placeholder="Sök"
          onChange={(event) => setQuery(event.target.value)}
        />
        <div>
          <Checkbox
            label="Period 1"
            value={checkedOne}
            onChange={handleChangeOne}
          />
          <Checkbox
            label="Period 2"
            value={checkedTwo}
            onChange={handleChangeTwo}
          />
        </div>
      </div>
      {filteredKurser.map((kurs) => (
        <Kurs key={kurs.kurskod} kursdata={kurs} />
      ))}

      <Signup />
    </div>
  );
}

export default App;
