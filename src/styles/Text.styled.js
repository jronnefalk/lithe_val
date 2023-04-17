import styled from "styled-components";

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
export const InfoTextKnapp = styled(InfoText)`
  margin-left: -0.3rem;
  font-size: 50%;
  color: black;
  text-decoration: none;
`;
export const SökText = styled.input`
  font-family: "Lato", sans-serif;
  font-size: 0.8rem;
  border: none;
  outline: none;
  width: 90%;
`;

export const FilterHeader = styled(InfoTitel)`
  font-size: 0.8rem;
  font-family: "Lato", sans-serif;
`;

export const FilterText = styled(InfoText)``;
