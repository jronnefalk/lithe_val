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
  display: grid;
  margin: 0 10vw;
  gap: 20px 20px;

  grid-template-columns: [first] 16vw [line] auto [end];
`;

export const KursContWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 20px;
  background-color: #f3f3f0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const KursCont = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  margin-top: 1%;
  margin-bottom: 1%;
  padding-left: 1.3rem;
  padding-top: 1.3rem;
  padding-bottom: 1rem;
  background-color: #ffffff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
// Sökfunktionen
export const SökochTextCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
export const SökCont = styled.div`
  display: flex;
  padding: 10px 20px;
  border-radius: 30px;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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
  margin: 0.8%;
`;
export const MinaSidorCont = styled.div`
  margin-left: auto;
  margin-right: 0.9%;
`;

// Filter

export const FilterCont = styled.div`
  padding: 16px;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const Filter = styled.div`
  width: 100%;
  margin-right: auto;
  border-radius: 20px;
  background-clip: padding-box;
  transition: top 0.5s ease, position 0.5s ease;
`;

// Övergång från absolute till fixed, kanske ska användas
/** 
@media (min-height: 1000px) {
  position: fixed;
}
*/

export const Grid = styled.div``;

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
  align-items: center;
  justify-content: center;
  padding-left: 2%;
  padding-bottom: 2%;
  padding-top: 1%;
  padding-right: 3%;
  padding-bottom: 2%;
  background-color: #f3f3f0;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const SchemaKurserCont = styled.div`
  width: 100%;
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
  align-items: center;
  justify-content: space-between;
  width: 99%;
  height: 3rem;
`;
export const SchemaMerInfo = styled.div`
  gap: 0.4rem;
  display: flex;
  flex-direction: column;
  margin-left: 1%;
`;
