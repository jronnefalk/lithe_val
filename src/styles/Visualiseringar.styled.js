import styled from "styled-components";

//Hela visualiseringsdelen
export const Visualiseringar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

//cirkelbar
//För cirkel och text
export const CirkelWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`;
//Cirkeln
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

//progressbars

//Bubblan som kommer upp när man hoverar
export const OmsluterBubble = styled.div`
  display: flex;
  flex-direction: column-reverse;
  position: relative;
`;
export const Bubble = styled.div`
  display: flex;
  flex-direction: column;
`;
export const SpeechBubble = styled.div`
  display: none;
  max-width: 70%;
  position: absolute;
  top: -3.3rem;
  left: 80.5%;
  background: rgb(255, 92, 100);
  padding: 0.3rem 0.8rem;
  text-align: center;
  color: rgb(255, 255, 255);
  border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 0.625rem solid transparent;
    border-right: 0.625rem solid transparent;
    border-top: 0.625rem solid rgb(255, 92, 100);
    left: 50%;
    bottom: -0.625rem;
    transform: translateX(-50%);
  }
`;

//Progressbar
export const Progressbar = styled.progress`
  border-radius: 2rem;
  overflow: hidden;
  height: 1rem;
  width: 110%;
  margin-bottom: 2rem;
  max-width: 460pt;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative; /* set position to relative for absolute positioning of ::before */
  &::-webkit-progress-value {
    background-color: #317773; /* ändra färgen här */
  }
  &::-webkit-progress-bar {
    background-color: #ffffff;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 83.3%; /* position the vertical line in the the progress bar */
    width: 4px; /* set the width of the vertical line */
    background-color: black; /* set the color of the vertical line */
  }

  &:hover ~ ${SpeechBubble} {
    display: block;
  }
`;
export const Progressbarochrubrik = styled.div`
  position: relative;
  float: right;
  margin-right: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
