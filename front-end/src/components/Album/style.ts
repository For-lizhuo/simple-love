import styled from "styled-components";

export const Box = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 50vw;
`;
export const TitleBox = styled.div`
  flex-basis: 8vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
export const Title = styled.div`
  width: fix-content;
  min-width: 20vw;
  max-width: 48vw;
  overflow-x: auto;
  height: 5vh;
  text-align: center;
  line-height: 5vh;
  font-size: 6vw;
  border: 1vw solid #c0c0c0;
  padding: 0 2vw;
`;
export const Line = styled.div`
  flex-basis: 2vh;
  margin: 0 auto;
  width: 30vw;
  background: linear-gradient(#c0c0c0, #dcdcdc);
  border-left: red 10px solid transparent;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
`;
export const PhotoBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
export const Forbid = styled.div`
  width: 40vw;
  height: 40vw;
  margin-bottom: 2vh;
  padding: 1vw;
  border: 1vw double #c0c0c0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-image: url('/src/resources/forbid.png');
  background-size: contain;
  background-repeat: no-repeat;
`;

export const Photo = styled.div`
  width: 40vw;
  height: 40vw;
  margin-bottom: 2vh;
  padding: 1vw;
  border: 1vw double #c0c0c0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Empty = styled.div`
  font-size: 8vw;
`;

export const Img = styled.img`
  width: 40vw;
  height: 40vw;
  object-fit: cover;
`;

export const Quantity = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  font-size: 5vw;
  width: fit-content;
  min-width: 6vw;
  height: 6vw;
  line-height: 6vw;
  text-align: center;
`;
