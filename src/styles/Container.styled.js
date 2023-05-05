import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #8bd0cc;
  }
`;

// Info om kurser divar
export const FirstInfoCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: -0.5rem;
  margin-right: 0.3rem;
`;
export const SecondInfoCont = styled(FirstInfoCont)`
  margin-top: -1.3rem;
  margin-right: 0.5rem;
  margin-bottom: -1.8rem;
`;

// Kurser divar
export const Cont = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  margin-right: auto;
  margin-left: 20%;
  width: 100%;
  max-width: 80%;
`;

export const KursContWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 10px;
  background-color: #f3f3f0;
`;

export const KursCont = styled.div`
  margin-bottom: 3%;
  padding: 16px;
  border: 0.5px solid black;
  border-radius: 20px;
  background-color: #ffffff;
`;
// Sökfunktionen
export const SökCont = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  padding: 5px 20px;
  width: 70%;
  border: 0.5px solid black;
  border-radius: 30px;
  box-sizing: border-box;
`;

//Menyn
export const MenyCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6 rem;
  max-width: 100%;
  flex-direction: row;
  text-decoration: none;

  svg:hover {
    color: red;
  }
  svg:hover + .text {
    color: red;
  }
`;
export const MinaSidorCont = styled.div`
  margin-left: auto;
  margin-right: 2%;
`;

// Filter

export const FilterCont = styled.div`
  padding: 16px;
  border-radius: 20px;
  border: 0.5px solid black;
`;

export const Filter = styled.div`
  width: 16%;
  margin-right: auto;
  margin-left: 10%;
  top: 19%;
  position: absolute;
`;

// Justerar enbart blocken i filtret
export const FilterBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: fit-content;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
`;
