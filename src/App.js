// Externa bibliotek
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { MinSida } from "./pages/MinSida";
import { Start } from "./pages/Start";

//design

import "./design/meny.css";

//icons
import { BsHouseDoorFill } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";

function App() {
  return (
    <>
      <div class="menybar">
        {/* state={} if we want to pass info */}
        <div class="start">
          <Link to="">
            {" "}
            <span>
              {" "}
              <BsHouseDoorFill
                size={28}
                style={{ padding: 0, margin: 0 }}
              />{" "}
              <h1 class="text">Startsida</h1>
            </span>
          </Link>
        </div>

        <div class="minasidor">
          <Link to="/minasidor">
            <span>
              {" "}
              <BsBookmark size={28} style={{ padding: 0, margin: 0 }} />{" "}
              <h1 class="text">Min sida</h1>
            </span>
          </Link>
        </div>

        <div class="loggain">
          <Link to="/loggain">
            <span class="loggain">
              {" "}
              <BsPerson size={32} style={{ padding: 0, margin: 0 }} />{" "}
              <h1 class="text">Logga in</h1>
            </span>
          </Link>
        </div>
      </div>
      h1.style.margin = "0";
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/minasidor" element={<MinSida />} />
      </Routes>
    </>
  );
}

export default App;
