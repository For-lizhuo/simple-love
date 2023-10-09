import styled from "styled-components";

export const Box = styled.div`
  width: 20vw;
  height: fit-content;
  display: flex;
  flex-direction: column;
  &:nth-child(odd){
    padding-top: 20vw;
  }
`;

export const Body = styled.div`
  width: 18vw;
  flex-basis: 18vw;
  margin: auto;
  background-image: url('/src/resources/balloon.png');
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vw;
  color: white;
`;

export const Line = styled.div`
  flex-basis:18vw;
  background-image: url('/src/resources/line.png');
  background-repeat: no-repeat;
  background-size: contain;
`;