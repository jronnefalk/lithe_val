import Dropdown from "react-bootstrap/Dropdown";
import styled from "styled-components";

//lägga  till kurser knappen

export const TaBort = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: none;
  &:hover {
    background-color: none;
    border-radius: 20%;
  }
`;
export const Dropd = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: none;

  &:hover {
    background-color: #ededed;
    border-radius: 20%;
  }
`;

//Meny
export const MenyKnapp = styled.button`
  border: none;
  background: none;
  &:hover {
    background-color: #ededed;
    border-radius: 20%;
  }
`;
export const MenyKnappLITHEVAL = styled.button`
  border: none;
  background: none;
  }
`;

//Ikone
export const SökIcont = styled.span`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 5px;
  top: -65px;
  left: 650px;
`;
//Schema

export const FlyttaKnappSchema = styled.button`
  margin-right: auto;
  margin-top: 3%;
  background-color: #b7e1df;
  border: none;
  border-radius: 20px;
  box-shadow: 1px 1px 1px #317773;

  &:hover {
    background-color: #f1f9f9;
    border: none;
  }
`;
export const DropdownB = styled(Dropdown.Toggle)`
  border: none;
  background: none;
`;
