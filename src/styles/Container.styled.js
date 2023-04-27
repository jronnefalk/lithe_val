import styled from "styled-components";

// Info om kurser divar
export const FirstInfoCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
export const SecondInfoCont = styled(FirstInfoCont)`
  margin-top: 2%;
`;

//Kurser hur de ligger divar
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
  display: flex;
  flex-direction: column;
  border: 0.5px solid black;
  border-radius: 20px;
  margin-top: 1%;
  margin-bottom: 3%;
  padding-left: 0.6rem;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
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

export const MinSidaCont = styled.div`
  display: flex;
  flex-direction: column;
`;

//schema
export const HelaSchemaCont = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
  justify-content: center;
`;
export const TerminWrapperSchema = styled.div`
  width: 22%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 2%;
  background-color: #ededed;
  padding-bottom: 2%;
  padding-top: 2%;
`;
export const SchemaKurserCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;
export const SchemaKursInfoCont = styled(KursCont)`
  width: min(136%, 14rem);

  background-color: white;
`;
export const TitelKnappCont = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 99%;
`;
export const SchemaMerInfo = styled.div`
  gap: 0.4rem;
  display: flex;
  flex-direction: column;
  margin-left: 1%;
`;
