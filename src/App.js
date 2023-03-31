// Externa bibliotek
import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { MinSida } from "./pages/MinSida";
import { Start } from "./pages/Start";

//design
import "./design/meny.css";
//import React, { useState } from "react";

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
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  //const [isHomePage, setIsHomePage] = useState(true);

  // Define the click event handler
  function handleClick() {
    // Update the state variable to toggle the icon
    setIsDoorOpen((prevIsDoorOpen) => !prevIsDoorOpen);
  }
  return (
    <>
      <div class="menybar">
        {/* state={} if we want to pass info */}
        <div class="start">
          <Link to="">
            {" "}
            <span>
              {" "}
              <button class="menyknapp" onClick={handleClick}>
                {isDoorOpen ? (
                  <BsHouseDoorFill size={30} />
                ) : (
                  <BsHouseDoor size={30} />
                )}

                <h1 class="text">Startsida</h1>
              </button>{" "}
            </span>
          </Link>
        </div>

        <div class="minasidor">
          <Link to="/minasidor">
            <span>
              {" "}
              <button class="menyknapp" onClick={handleClick}>
                {isDoorOpen ? (
                  <BsFolder size={30} />
                ) : (
                  <BsFolderFill size={30} />
                )}
                <h1 class="text">Startsida</h1>
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
