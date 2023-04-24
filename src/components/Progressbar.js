import React from "react";
import styled from "styled-components";

const PercentNumber = styled.div`
  font-size: 23px;
  font-family: Barlow;
  color: rgb(60, 60, 60);
  padding-bottom: 16px;
`;

const Container = styled.div`
  border-radius: 12px;
  -webkit-box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.25),
    inset -3px -2px 4px rgba(200, 200, 200, 0.25);
  box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.25),
    inset -3px -2px 4px rgba(200, 200, 200, 0.25);
  height: 35px;
  width: 80vw;
  max-width: 460pt;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

const ProgressBar = styled.div`
  position: absolute;
  height: 35px;
  max-width: 100%;
  background-color: #ed6519;
  transform-origin: 0% 100%;
  transition: 0.8s ease;
  transition-delay: 0.1s;
`;

const Progressbar = () => {
  const startDate = new Date("09/09/2020");
  const endDate = new Date("06/06/2025");
  const totDays =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  const compleated = Math.round(
    (new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const percentageDiff = Math.round((compleated / totDays) * 100);

  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    setValue(percentageDiff);
  }, [percentageDiff]);

  return (
    <div>
      <PercentNumber>Klart av MT: {percentageDiff}%</PercentNumber>
      <Container>
        <ProgressBar style={{ width: `${value}%` }} />
      </Container>
    </div>
  );
};

export default Progressbar;
