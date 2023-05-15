//import Dropdown from "react-bootstrap/Dropdown";
import styled from "styled-components";

//lägga  till kurser knappen

export const TaBort = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: none;
  margin-right: 1.8rem;
  &:hover {
    background-color: none;
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

export const DropdownMenu = styled.div`
  display: none;
  width: 100%;
  box-sizing: border-box;
  padding: 2px 2px;
  z-index: 1;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const Dropdown = styled.div`
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover ${DropdownMenu} {
    display: flex;
    flex-direction: column;
    background-color: lightgrey;
  }
`;

export const DropdownItem = styled.button`
  border: none;


  &:hover {
    background-color: lightgrey;
  }
}
`;
export const DropdownB = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  margin-right: 1.8rem;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  &:hover {
    background-color: lightgrey;
  }

  ${Dropdown}:hover & {
    background-color: lightgrey;
  }
`;

// Filtret
export const StyledCheckbox = styled.input`
  background-color: #317773;
`;
