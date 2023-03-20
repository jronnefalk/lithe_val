// Externa bibliotek
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { MinSida } from "./pages/MinSida";
import { Start } from "./pages/Start";

function App() {

  return (
    <>
    <nav>
      <ul>
        <li>
          <Link to="/">Start</Link>
        </li>
        <li>
          <Link to="/minasidor">Min Sida</Link>
        </li>
      </ul>
    </nav>

    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/minasidor" element={<MinSida />} />

    </Routes>
    </>
    
  )
  
}

export default App;
