import React from "react";

function Checkbox({ label, value, onChange }) {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
}

export default function Filters({ onSelectFilter }) {
  const [checkedPeriod1, setCheckedPeriod1] = React.useState(false);
  const [checkedPeriod2, setCheckedPeriod2] = React.useState(false);

  React.useEffect(() => {
    onSelectFilter("period", checkedPeriod1 ? "1" : "");
  }, [checkedPeriod1, onSelectFilter]);

  React.useEffect(() => {
    onSelectFilter("period", checkedPeriod2 ? "2" : "");
  }, [checkedPeriod2, onSelectFilter]);

  const handlePeriod1Change = () => {
    setCheckedPeriod1(!checkedPeriod1);
    //onSelectFilter("period", checkedPeriod1 ? "" : "1");
  };
  const handlePeriod2Change = () => {
    setCheckedPeriod2(!checkedPeriod2);
    //onSelectFilter("period", checkedPeriod2 ? "" : "2");
  };

  return (
    <div>
      <Checkbox
        label="Period 1"
        value={checkedPeriod1}
        onChange={handlePeriod1Change}
      />
      <Checkbox
        label="Period 2"
        value={checkedPeriod2}
        onChange={handlePeriod2Change}
      />
    </div>
  );
}
