import React from "react";
import Checkbox from "./Checkbox";
//import { useState } from "react";

export default function Filters({ label, value, onChange }) {
  const [checkedOne, setCheckedOne] = React.useState(false);
  const [checkedTwo, setCheckedTwo] = React.useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };
  return (
    <div>
      <Checkbox
        label="Period 1"
        value={checkedOne}
        onChange={handleChangeOne}
      />
      <Checkbox
        label="Period 2"
        value={checkedTwo}
        onChange={handleChangeTwo}
      />
      <Checkbox
        label="Period 3"
        value={checkedTwo}
        onChange={handleChangeTwo}
      />
    </div>
  );
}
