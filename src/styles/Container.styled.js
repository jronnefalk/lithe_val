import styled from "styled-components";

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
  align-items: flex-start;
  flex-direction: row;
`;
export const KursContWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: 1.5%;
`;
export const KursCont = styled.div`
  margin-bottom: 3%;
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
  width: 9%;
  padding: 16px;
  margin-right: 5%;
  margin-left: 7%;
  border: 0.5px solid black;
  border-radius: 20px;
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
