// Externa bibliotek
import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { MinSida } from "./pages/MinSida";
import { Start } from "./pages/Start";

//style
import { MenyCont, MinaSidorCont } from "./styles/Container.styled";
import { MenyKnapp, MenyKnappLITHEVAL } from "./styles/Knappar.styled";
import { MenyText, RubrikHemsida } from "./styles/Text.styled";

//icons
//import { BsHouseDoorFill } from "react-icons/bs";
//import { BsHouseDoor } from "react-icons/bs";
import { BsFolder } from "react-icons/bs";
import { BsFolderFill } from "react-icons/bs";

// Komponenter;
import GoogleAuth from "./components/GoogleAuth";

export default function App() {
  const [isFilled, setFilled] = useState();
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const loadAuthState = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsAuthLoaded(true);
    };

    loadAuthState();
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/") {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, []);

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

  // Render the component when the authentication state is loaded
  if (!isAuthLoaded) {
    return null; // or return a loading component
  }

  return (
    <>
      <MenyCont>
        <Link to="">
          <MenyKnappLITHEVAL onClick={handleClickHouse}>
            <RubrikHemsida>
              {" "}
              {isFilled ? " LITHEVAL" : "LITHEVAL"}
            </RubrikHemsida>
          </MenyKnappLITHEVAL>
        </Link>

        <MinaSidorCont>
          <Link to="/minasidor">
            <span>
              {" "}
              <MenyKnapp onClick={handleClickMyPage}>
                {isFilled ? <BsFolder size={33} /> : <BsFolderFill size={33} />}
                <MenyText>Min sida</MenyText>
              </MenyKnapp>{" "}
            </span>
          </Link>
        </MinaSidorCont>
        <GoogleAuth />
      </MenyCont>

      {isAuthLoaded && (
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/minasidor" element={<MinSida />} />
        </Routes>
      )}
    </>
  );
}
