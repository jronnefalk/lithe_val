// Externa bibliotek
import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { MinSida } from "./pages/MinSida";
import { Start } from "./pages/Start";

//style
import { MenyCont, MinaSidorCont } from "./styles/Container.styled";
import { MenyKnapp } from "./styles/Knappar.styled";
import { InfoText, Titel, MenyText } from "./styles/Text.styled";

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
      <MenyCont>
        <Link to="">
          {" "}
          <span>
            {" "}
            <MenyKnapp onClick={handleClickHouse}>
              {isFilled ? (
                <BsHouseDoorFill size={30} />
              ) : (
                <BsHouseDoor size={30} />
              )}

              <InfoText>Startsida</InfoText>
            </MenyKnapp>{" "}
          </span>
        </Link>

        <Titel>LITHEVAL</Titel>

        <MinaSidorCont>
          <Link to="/minasidor">
            <span>
              {" "}
              <MenyKnapp onClick={handleClickMyPage}>
                {isFilled ? <BsFolder size={30} /> : <BsFolderFill size={30} />}
                <MenyText>Min sida</MenyText>
              </MenyKnapp>{" "}
            </span>
          </Link>
        </MinaSidorCont>
        <GoogleAuth />
      </MenyCont>

      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/minasidor" element={<MinSida />} />
      </Routes>
    </>
  );
}
