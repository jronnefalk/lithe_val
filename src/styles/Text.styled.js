import styled from "styled-components";

//Kurser
// Standard text för all liten text
export const Text = styled.p`
  font-family: "Lato", sans-serif;
  font-size: 0.8rem;
  margin: 0;
`;
// Standard text för alla rubriker på sidan
export const Titel = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 1.05rem;
  margin-bottom: 3%;
`;
//Texten som syns när man har tryckt på läs mer
export const TextUnderLäsMer = styled(Text)`
  margin-top: 10px;
`;
// Huvudområde, Text med bakgrund
export const TextHuvudnivå = styled(Text)`
  margin-right: 0.8rem;
  background-color: #e4eaf1;
  border-radius: 20px;
  padding: 5px;
`;
// Utbildningsnivå, Text med bakgrund
export const TextUtbildningsnivå = styled(TextHuvudnivå)`
  background-color: #e2f3f2;
`;

// Minimumkraven
export const BubbleText = styled(Text)`
  font-size: 80%;
`;

export const LäsMerText = styled(Text)`
  display: flex;
  align-items: end;
  margin-top: 5%;
  text-decoration-line: underline;
`;
// Visa mer knappen och Lägga till knapp
export const InfoTextKnapp = styled(Text)`
  font-size: 82%;
  color: black;
  text-decoration: none;
  margin-bottom: 8px;
  margin-top: 4px;
  &:hover {
    background-color: #ededed;
    border-radius: 20%;
  }
`;
// Sök texten
export const SökText = styled.input`
  font-family: "Lato", sans-serif;
  font-size: 0.8rem;
  border: none;
  outline: none;
  width: 97%;
`;
export const RubrikProgressbar = styled(Titel)`
  float: right;
  margin-right: 1%;
  display: flex;
  flex-direction: row;
`;

// Meny text
export const RubrikHemsida = styled.h1`
  color: #317773;
  font-family: "Futura-Bold", arial;
  font-size: 40px;
  margin-top: 0%;
`;

export const MenyText = styled.p`
  font-family: "Lato", sans-serif;
  font-size: 0.6rem;
  margin-top: 0;
`;

//Schema
export const TitelSOchV = styled.h1`
  font-family: "Futura-Bold", arial;
  font-size: 40px;
  color: #317773;
  text-align: center;
  margin-top: 1%;
`;
export const PeriodSchema = styled(Text)`
  font-size: 1rem;
  margin-left: 1%;
  padding-bottom: 4%;
  padding-top: 4%;
`;
export const FlyttaSchemaText = styled(Text)`
  font-size: 70%;
`;
export const SchemaTitelKurs = styled(Titel)`
  font-size: 1rem;
`;
export const SchemaTextInfo = styled(Text)``;

//för att göra rubriken LITEVAL mindre

export const FilterHeader = styled(Titel)`
  font-size: 0.8rem;
`;
export const SchemaLäsMerText = styled(LäsMerText)`
  font-size: 0.8rem;
`;
export const SchemaInfoText2 = styled(TextHuvudnivå)`
  font-size: 0.8rem;
`;
// Filter Checkboxarna
export const FilterText = styled(Text)`
  margin: 7px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FilterTextBlock = styled(Text)`
  margin: 3px 2px 2px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
