import styled from "styled-components";

export const Cirkelochrubrik = styled.div``;
export const Minsida = styled.div`
  float: left;
  margin-left: 2%;
  display: flex;
  flex-direction: column;
`;

export const Progressbar = styled.progress`
  border-radius: 2rem;
  overflow: hidden;
  height: 1rem;
  width: 30rem;
  margin-bottom: 2rem;
  max-width: 460pt;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative; /* set position to relative for absolute positioning of ::before */
  &::-webkit-progress-value {
    background-color: #317773; /* ändra färgen här */
  }
  &::-webkit-progress-bar {
    background-color: #d9d9d9;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 83.3%; /* position the vertical line in the middle of the progress bar */
    width: 4px; /* set the width of the vertical line */
    background-color: white; /* set the color of the vertical line */
  }
`;

export const Progressbarochrubrik = styled.div`
  float: right;
  margin-right: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// export const LimitLine = styled.div`
//   position: absolute;
//   bottom: ${(props) => props.hpPercent}%;
//   left: 0;
//   right: 0;
//   height: 100px;
//   background-color: #00000;
// `;

export const Cirkel = styled.progress`
  width: 10rem;
  height: 20rem;
  background: conic-gradient(
    border-radius: 50%;
    &::-webkit-progress-value {
      background-image: conic-gradient(#333 0% ${(props) =>
        (props.value / props.max) * 360}deg, #eee ${(props) =>
  (props.value / props.max) * 360}deg 100%);
      border-radius: inherit;
    }
    transform: rotate(-90deg);
  `;
