import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryLabel } from "victory";

const Circle = ({ hp }) => {
  const [percent, setPercent] = useState(0);
  const [data, setData] = useState(getData(0));
  const [animate, setAnimate] = useState({ duration: 1000 });

  useEffect(() => {
    const startAnimation = () => {
      const newPercent = (hp / 90) * 100;
      if (newPercent > 0) {
        setPercent(newPercent);
        setData(getData(newPercent));
        setAnimate({ duration: 1000 });
      } else {
        setPercent(1);
        setData(getData(1)); // set an initial value to avoid animation starting from 0
        setAnimate({ duration: 0 }); // set animation duration to 0 for first lap
      }
    };

    startAnimation();
  }, [hp]);

  function getData(percent) {
    let color = "#317773";
    let fill1 = "gray";
    let fill2 = "transparent";
    let y1 = percent;
    let y2 = 0;

    if (percent > 100) {
      color = "red";
      fill1 = "transparent";
      fill2 = "green";
      y1 = 100;
      y2 = percent - 100;
    }
    return [
      { x: 1, y: y1, fill: color },
      { x: 2, y: -y2, fill: fill2 },
      { x: 3, y: 100 - y1, fill: fill1 },
    ];
  }

  return (
    <svg viewBox="0 0 400 400" width="40%" height="40%">
      <VictoryPie
        duration={1000}
        standalone={false}
        animate={animate}
        width={400}
        height={400}
        labels={() => null}
        data={[
          { x: 1, y: 100 },
          { x: 2, y: 0 },
        ]} // Gray background
        innerRadius={120}
        style={{
          data: {
            fill: "gray",
            stroke: "none",
          },
        }}
      />
      <VictoryPie
        duration={1000}
        standalone={false}
        animate={animate}
        width={400}
        height={400}
        data={data}
        innerRadius={120}
        cornerRadius={25}
        labels={() => null}
        style={{
          data: {
            fill: ({ datum }) => {
              return datum.fill;
            },
          },
        }}
      />

      <VictoryLabel
        textAnchor="middle"
        verticalAnchor="middle"
        x={200}
        y={200}
        text={`${Math.round(percent)}%`}
        style={{ fontSize: 45 }}
      />
    </svg>
  );
};

export default Circle;
