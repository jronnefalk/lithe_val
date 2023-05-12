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
  padding: 20px;
  border-radius: 20px;
  background-color: #f3f3f0;
`;

export const KursCont = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.5px solid black;
  border-radius: 20px;
  margin-top: 1%;
  margin-bottom: 1%;
  padding-left: 1.3rem;
  padding-top: 1.3rem;
  padding-bottom: 1rem;
  background-color: #ffffff;
`;
// Sökfunktionen
export const SökCont = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  padding: 10px 20px;
  width: 70%;
  border: 0.5px solid black;
  border-radius: 30px;
  box-sizing: border-box;
  background-color: #ffffff;
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
export const MinaSidorCont = styled.div`
  margin-left: auto;
  margin-right: 1%;
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
  top: 20%;
  position: absolute;
  background-color: #ffffff;
  border-radius: 20px;
  background-clip: padding-box;
  transition: top 0.5s ease, position 0.5s ease;

  @media (min-height: 1000px) {
    position: fixed;
  }
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
  background-color: 
  padding-bottom: 2%;
  padding-top: 1%;
  padding-right: 3%;
  background-color: #f3f3f0;
  border-radius: 20px;
`;
export const SchemaKurserCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;
export const SchemaKursInfoCont = styled(KursCont)`
  width: min(18rem, 17rem);
  background-color: white;
  padding-left: 0.6rem;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
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
