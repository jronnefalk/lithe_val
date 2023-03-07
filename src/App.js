import React from "react";
import kurser from "./webscraping/database.json";
import Kurs from "./Kurs";

function App() {
  return (
    <div className="App">
      {kurser.map((kurs) => (
        <Kurs key={kurs.kurskod} kursdata={kurs} />
      ))}
    </div>
  );
}

export default App;
