import React from "react";

function Checkbox({ label, value, onChange }) {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
}

export default function Filters() {
  const [checkedOne, setCheckedOne] = React.useState(false);
  const [checkedTwo, setCheckedTwo] = React.useState(false);
  const [checkedThree, setCheckedThree] = React.useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };
  const handleChangeThree = () => {
    setCheckedThree(!checkedThree);
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
        value={checkedThree}
        onChange={handleChangeThree}
      />
    </div>
  );
}
