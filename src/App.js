// Externa bibliotek
import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { MinSida } from "./pages/MinSida";
import { Start } from "./pages/Start";

//style
import { MenyCont } from "./styles/Container.styled";
//design
import "./design/meny.css";

//icons
import { BsHouseDoorFill } from "react-icons/bs";
import { BsHouseDoor } from "react-icons/bs";
import { BsFolder } from "react-icons/bs";
import { BsFolderFill } from "react-icons/bs";

// Komponenter
// import googleSignin from "./components/Signup";
// import googleSignout from "./components/Signup";
import GoogleAuth from "./components/GoogleAuth";

export default function App() {
  // Define the state variable for the icon
  const [isFilled, setFilled] = useState(true);

  //const [isHomePage, setIsHomePage] = useState(true);

  // Define the click event handler
  function handleClickHouse() {
    // Update the state variable to toggle the icon

    if (window.location.pathname === "/") {
      return;
    }

    setFilled((isFilled) => true);
  }

  function handleClickMyPage() {
    // Update the state variable to toggle the icon

    if (window.location.pathname === "/minasidor") {
      return;
    }

    setFilled((isFilled) => false);
  }

  return (
    <>
      <MenyCont>
        {/* state={} if we want to pass info */}
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
      </MenyCont>

      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/minasidor" element={<MinSida />} />
      </Routes>
    </>
  );
}
