import styled from "styled-components";

//Info om kurser divar
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

//Kurser divar
export const Cont = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
`;
export const KursContWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 51%;
`;
export const KursCont = styled.div`
  margin-bottom: 3%; /* add margin between course containers */
  padding: 16px;
  border: 0.5px solid black;
  border-radius: 20px;
`;
// Sökfunktionen
export const SökCont = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  margin-top: 20px;
  padding-left: 10px;
  height: 30px;
  width: 50%;
  border: 0.5px solid black;
  border-radius: 30px;
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
`;
export const FilterCont = styled.div`
  width: 17%;
  padding: 16px;
  margin-right: 5%;
  border: 0.5px solid black;
  border-radius: 20px;
`;

export const FilterBlock = styled.div``;
