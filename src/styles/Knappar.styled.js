import styled from "styled-components";

//lägga  till kurser knappen

export const TaBortSchema = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
  color: rgb(255, 92, 100);

  &:hover {
    background-color: none;
    border-radius: 20%;
  }
`;
export const TaBort = styled(TaBortSchema)`
  margin-right: 1.8rem;
  color: rgb(255, 92, 100);
`;

//Meny
export const MenyKnapp = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #317773;
  &:hover {
    color: #e8e8e5;
  }
  position: relative;
`;
export const RedDot = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
`;
export const MenyKnappLITHEVAL = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  }
`;

//Ikone
export const SökIcont = styled.span`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 5px;
  top: -65px;
  left: 650px;
  cursor: pointer;
`;
//Schema

export const FlyttaKnappSchema = styled.button`
  margin-right: auto;
  margin-top: 3%;
  background-color: #b7e1df;
  border: none;
  border-radius: 20px;
  box-shadow: 1px 1px 1px #317773;
  cursor: pointer;

  &:hover {
    background-color: #f1f9f9;
    border: none;
  }
`;

export const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  padding: 2px 2px;
  z-index: 1;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
`;

export const Dropdown = styled.div`
  position: relative;
  border: none;
  display: inline-block; /* Changed display to inline-block */
  cursor: pointer;

  &:hover ${DropdownMenu} {
    display: flex;
    flex-direction: column;
    background-color: #f3f3f0;
  }
`;

export const DropdownItem = styled.button`
  border: none;
  cursor: pointer;
  background-color: #f3f3f0;

  &:hover {
    background-color: #bbdbd7;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export const DropdownB = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #317773;
  border: none;
  margin-right: 1.8rem;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f3f3f0;
  }
  ${Dropdown}:hover & {
    background-color: #f3f3f0;
  }
`;

// Filtret
export const StyledCheckbox = styled.input`
  appearance: none;
  position: relative;
  width: 16px;
  height: 16px;
  border: 1.5px solid #bbb;
  border-radius: 4px;
  outline: none;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;

  &:checked {
    background-color: #317773;
  }

  &:checked:after {
    content: "✓"; /* Unicode character for checkmark */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex; /* Display the label and checkbox as flex items */
  align-items: center; /* Align the items vertically */
  cursor: pointer;
`;
