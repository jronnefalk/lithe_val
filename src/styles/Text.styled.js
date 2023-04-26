import styled from "styled-components";
//Text till info om kurser

export const InfoText = styled.p`
  font-family: "Lato", sans-serif;
  font-size: 0.8rem;
`;

export const InfoTitel = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 1.13rem;
`;

export const InfoText2 = styled(InfoText)`
  margin-right: 0.8rem;
  background-color: #ebebeb;
  border-radius: 20px;
  padding: 5px;
  margin-top: 2rem;
`;

export const InfoText3 = styled(InfoText2)`
  background-color: #e2f3f2;
`;

export const LäsMerText = styled(InfoText)`
  display: flex;
  align-items: end;
`;
//Visa mer knappen och Lägga till knapp
export const InfoTextKnapp = styled(InfoText)`
  font-size: 70%;
  color: black;
  text-decoration: none;
`;
// Sök texten
export const SökText = styled.input`
  font-family: "Lato", sans-serif;
  font-size: 0.8rem;
  border: none;
  outline: none;
  width: 90%;
`;
export const RubrikProgressbar = styled(InfoTitel)`
  float: right;
  margin-right: 1%;
  display: flex;
  flex-direction: row;
`;

// Meny text

export const Titel = styled.h1`
  color: #317773;
  font-family: "Futura-Bold", arial;
  font-size: 40px;
  margin-top: 0%;
  margin-left: 39%;
`;

export const MenyText = styled.p`
  font-family: "Lato", sans-serif;
  font-size: 0.6rem;
`;

// Block, Period, Ort.... rubrik
export const FilterHeader = styled(InfoTitel)`
  font-size: 0.8rem;
`;

// Checkboxarna
export const FilterText = styled(InfoText)`
  margin: 2px 0px;
`;

export const FilterTextBlock = styled(InfoText)`
  margin: 2px 0 1px 0;
`;
