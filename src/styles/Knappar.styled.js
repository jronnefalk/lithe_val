import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";

//lägga  till kurser knappen

export const LäggaTill = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: right;
  border: none;
  background: none;
  position: relative;
  top: -100px;
  margin-left: 94%;
`;
export const LäggaTillDroppD = styled(Dropdown.Toggle)`
  display: flex;
  flex-direction: column;
  justify-content: right;
  border: none;
  background: none;
  position: relative;
  top: -100px;
  margin-left: 94%;
`;

//Meny
export const MenyKnapp = styled.button`
  border: none;
  background: none;
`;

//Ikone
export const SökIcont = styled.span`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 5px;
  top: -65px;
  left: 650px;
`;
