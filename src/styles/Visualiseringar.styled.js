import styled from "styled-components";

export const Progressbarochrubrik = styled.div`
  float: right;
  margin-right: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Cirkelochrubrik = styled.div``;
export const CirkelRubrikMinakurser = styled.div`
  float: left;
  margin-left: 2%;
  display: flex;
  flex-direction: column;
`;

export const Progressbar = styled.progress`
  border-radius: 2rem;
  overflow: hidden;
  height: 1rem;
  width: 30rem;
  margin-bottom: 2rem;
  &::-webkit-progress-value {
    background-color: #317773; /* ändra färgen här */
  }
`;
export const Cirkel = styled.progress`
  width: 10rem;
  height: 10rem;
  background: conic-gradient(
    ::-webkit-progress-value {
      background-image: conic-gradient(#333 0% ${(props) =>
        (props.value / props.max) * 360}deg, #eee ${(props) =>
  (props.value / props.max) * 360}deg 100%);
      border-radius: 50%;
    }
  `;
