import styled from "styled-components";

//Kurser på start sida
// Standard text för all liten text
export const Text = styled.p`
  font-family: "Lato", sans-serif;
  font-size: 1rem;
  margin: 0;
`;
// Standard text för alla rubriker på sidan
export const Titel = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 1.4rem;
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
//Texten på Knappen läsa mer
export const LäsMerText = styled(Text)`
  display: flex;
  align-items: end;
  margin-top: 5%;
  text-decoration-line: underline;
  cursor: pointer;
`;

// texten som ligger på lägg till knappen i droppdown
export const InfoTextKnapp = styled(Text)`
  font-size: 90%;
  color: black;
  text-decoration: none;
  margin-bottom: 8px;
  margin-top: 4px;
`;

//Sökfunktion
// Sök texten
export const SökText = styled.input`
  font-family: "Lato", sans-serif;
  font-size: 0.8rem;
  border: none;
  outline: none;
  width: 90%;
`;
export const AntalSökResultat = styled(Text)`
  padding-left: 20px;
  font-size: 0.7rem;
`;

// Meny text
//Rubriken på sidan
export const RubrikHemsida = styled.h1`
  color: #317773;
  font-family: "Futura-Bold", arial;
  font-size: 40px;
  margin-top: 0%;
  text-shadow: 1px 3px 2px rgba(0, 0, 0, 0.3);
`;
//Text på menyknapparna
export const MenyText = styled.p`
  font-family: "Lato", sans-serif;
  font-size: 0.8rem;
  margin-top: 0;
`;

//Rubrik till visulaiseringar och schema
export const TitelSOchV = styled.h1`
  font-family: "Futura-Bold", arial;
  font-size: 40px;
  color: #317773;
  text-align: center;
`;

//Visulaiseringar text
export const RubrikProgressbar = styled(Titel)`
  float: right;
  margin-right: 1%;
  display: flex;
  flex-direction: row;
`;
// Minimumkraven
export const BubbleText = styled(Text)`
  font-size: 0.9rem%;
`;

//Schema
export const PeriodSchema = styled(Text)`
  font-size: 1rem;
  margin-left: 1%;
  padding-bottom: 4%;
  padding-top: 4%;
`;
export const FlyttaSchemaText = styled(Text)`
  font-size: 70%;
  font-weight: 900;
`;
export const SchemaTitelKurs = styled(Titel)`
  font-size: 1rem;
`;
export const SchemaTextInfo = styled(Text)`
  font-size: 0.8rem;
`;
export const SchemaLäsMerText = styled(LäsMerText)`
  font-size: 0.8rem;
`;
export const SchemaTextUtbildningsnivå = styled(TextUtbildningsnivå)`
  font-size: 0.8rem;
`;

//Filter
//Rubrik i filtret
export const FilterHeader = styled(Titel)`
  font-size: 1rem;
`;
// texten till alla andra alternativ i Filter
export const FilterText = styled(Text)`
  margin: 7px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
// Texten till blocken
export const FilterTextBlock = styled(Text)`
  margin: 3px 2px 2px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
