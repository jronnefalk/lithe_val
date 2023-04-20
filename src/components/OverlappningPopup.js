import React from "react";

export default function OverlappningPopup({ showPopup, setShowPopup }) {
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
    backgroundColor: "#000",
    color: "#fff",
    cursor: "pointer",
  };

  function handlePopup() {
    setShowPopup(!showPopup);
  }

  //   style={popupStyle}
  //   style={messageStyle}

  return (
    <div style={popupStyle}>
      <div style={messageStyle}>
        <p>Du har valt en kurs som överlappar med en annan</p>
        <button style={buttonStyle} onClick={handlePopup}>
          OK
        </button>
      </div>
    </div>
  );
}
