import styled from "styled-components";

export const Box = styled.div`
  flex-basis: 10vh;
  display: flex;
`;
export const Back = styled.div<{ set: boolean|undefined }>`
  flex-basis: 20vw;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${(props) => (props.set ? "visible" : "hidden")};
`;
export const Title = styled.div`
  text-align: center;
  line-height: 10vh;
  font-size: 8vw;
  flex: 1;
`;
export const BackHome = styled.div<{ set: boolean|undefined }>`
  flex-basis: 20vw;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${(props) => (props.set ? "visible" : "hidden")};
`;

export const Img = styled.img`
  width: 10vw;
  height: 10vw;
`;
