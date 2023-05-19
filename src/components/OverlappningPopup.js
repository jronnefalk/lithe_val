import React from "react";
import { RubrikProgressbar } from "../styles/Text.styled";

export default function OverlappningPopup({
  setShowOverlapping,
  foundOverlappningCourse,
}) {
  const popupStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "9999",
  };

  const messageStyle = {
    fontSize: "1.5rem",
    textAlign: "center",
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "0.5rem",
  };

  const buttonStyle = {
    fontSize: "1.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    border: "none",
    backgroundColor: "#fff",
    color: "rgb(255,92,100)",
    cursor: "pointer",
    boxShadow: "rgba(99,99,99,0.2) 0px 2px 8px 0px",
  };
  const kursnamn = {
    fontWeight: "bold",
  };

  function handlePopup() {
    setShowOverlapping(false);
  }

  console.log(foundOverlappningCourse);

  return (
    <div style={popupStyle}>
      <div style={messageStyle}>
        <p>
          Den valda kursen överlappar med{" "}
          <span style={kursnamn}>{foundOverlappningCourse}</span>.
          <br />
          Kurserna får inte ingå i en examen tillsammans.
        </p>
        <button style={buttonStyle} onClick={handlePopup}>
          OK
        </button>
      </div>
    </div>
  );
}
