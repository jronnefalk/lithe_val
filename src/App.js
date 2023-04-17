// Externa bibliotek
import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { MinSida } from "./pages/MinSida";
import { Start } from "./pages/Start";

//design
import "./design/meny.css";

//icons
import { BsHouseDoorFill } from "react-icons/bs";
import { BsHouseDoor } from "react-icons/bs";
import { BsFolder } from "react-icons/bs";
import { BsFolderFill } from "react-icons/bs";

// Komponenter;
import GoogleAuth from "./components/GoogleAuth";

export default function App() {
  const [isFilled, setFilled] = useState();

  //kollar var den är när man uppdaterar sidan
  useState(() => {
    if (window.location.pathname === "/") {
      setFilled(true);
    } else {
      setFilled(false);
    }
  });

  // fyll i husknappen när man klickar på den
  function handleClickHouse() {
    if (window.location.pathname === "/") {
      return;
    }
    setFilled((isFilled) => true);
  }

  // fyll i hemknappen när man klickar på den
  function handleClickMyPage() {
    if (window.location.pathname === "/minasidor") {
      return;
    }
    setFilled((isFilled) => false);
  }

  return (
    <>
      <div className="menybar">
        {}
        <div className="start">
          <Link to="">
            {" "}
            <span>
              {" "}
              <button className="menyknapp" onClick={handleClickHouse}>
                {isFilled ? (
                  <BsHouseDoorFill size={30} />
                ) : (
                  <BsHouseDoor size={30} />
                )}

                <h1 className="text">Startsida</h1>
              </button>{" "}
            </span>
          </Link>
        </div>

        <h1 className="rubrik">LITHEVAL</h1>

        <div className="minasidor">
          <Link to="/minasidor">
            <span>
              {" "}
              <button className="menyknapp" onClick={handleClickMyPage}>
                {isFilled ? <BsFolder size={30} /> : <BsFolderFill size={30} />}
                <h1 className="text">Min sida</h1>
              </button>{" "}
            </span>
          </Link>
        </div>
        <GoogleAuth />
      </div>

      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/minasidor" element={<MinSida />} />
      </Routes>
    </>
  );
}
