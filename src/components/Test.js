import React from "react";
import { getUserData } from "../firebase_setup/firebase.js";

export default function Test() {
  const style = {
    color: "red",
    fontSize: "200px",
    fontWeight: "bold",
  };

  return (
    <button style={style} onClick={getUserData}>
      Test
    </button>
  );
}
