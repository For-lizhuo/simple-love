import styled from "styled-components";
import { AlbumPopUpType } from "../../types/common";

export const Box = styled.div<{ popUp: AlbumPopUpType }>`
  opacity: ${(props) => (props.popUp === null ? "1" : "0.2")};
`;

export const Buttons = styled.div`
  display: flex;
  height: 10vh;
  align-items: center;
`;

export const PopUp = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const AddBox = styled.div`
  display: flex;
  width: 80vw;
  height: 40vh;
  flex-direction: column;
  align-items: center;
  position: fixed;
  border-radius: 20px;
  top: 30vh;
  left: 10vw;
  background-color: #f5f5f5;
`;

export const Title = styled.div`
  text-align: center;
  flex-basis: 10vh;
  line-height: 10vh;
  font-size: 8vw;
`;

export const AddInput = styled.input`
  width: 56vw;
  flex-basis: 8vh;
  background-color: #dcdcdc;
  padding: 0 6vw;
  border-radius: 4vh;
  font-size: 5vw;
`;

export const Warn = styled.div<{ isShown: boolean }>`
  visibility: ${(props) => (props.isShown ? "visible" : "hidden")};
  flex-basis: 3vh;
  font-size: 4vw;
  line-height: 3vh;
  color: #f08080;
`;

export const RadioBox = styled.div`
  width: 68vw;
  flex-basis: 8vh;
  display: flex;
  align-items: center;
`;

export const Radio = styled.input`
  flex-basis: 25%;
  width: 6vw;
  height: 6vw;
`;

export const Label = styled.label`
  flex-basis: 25%;
  font-size: 6vw;
`;

export const ButtonBox = styled.div`
  margin-top: 2vh;
  flex: 1;
  display: flex;
`;

export const Button = styled.div<{ isAble?: boolean }>`
  width: 32vw;
  margin: 0 2vw;
  border-radius: 3vh;
  height: 6vh;
  line-height: 6vh;
  text-align: center;
  background-color: #dcdcdc;
  font-size: 6vw;
  &:last-child {
    color: ${(props) => (props.isAble === true ? "inherit" : "#A9A9A9")};
  }
`;

export const DeleteBox = styled.div`
  display: flex;
  width: 80vw;
  height: fit-content;
  flex-direction: column;
  align-items: center;
  position: fixed;
  border-radius: 20px;
  top: 20vh;
  left: 10vw;
  background-color: #f5f5f5;
  padding-bottom: 3vh;
`;

export const DeleteWarn = styled.div`
  flex-basis: 5vh;
  font-size: 4vw;
  color: #ff6347;
  width: 100%;
  text-align: center;
`;

export const ListBox = styled.div`
  flex-basis: content;
  width: 60vw;
  margin-bottom: 2vh;
`;

export const List = styled.div`
  height: 6vh;
  display: flex;
  align-items: center;
`;

export const DeleteLabel = styled.label`
  flex-basis: 60%;
  font-size: 6vw;
  line-height: 6vw;
`;

export const AlbumQuantity = styled.div`
  flex-basis: 30%;
  font-size: 5vw;
  line-height: 5vw;
`;

export const DeleteButton = styled.div`
  background-image: url("/src/resources/delete_fill.png");
  width: 6vw;
  height: 6vw;
  background-size: contain;
  background-repeat: none;
  box-shadow: 0.5vw 0.5vw rgba(192, 192, 192, 0.4);
`;

export const FilterFC = styled.div`
  display: flex;
  width: 80vw;
  height: 32vh;
  flex-direction: column;
  align-items: center;
  position: fixed;
  border-radius: 20px;
  top: 30vh;
  left: 10vw;
  background-color: #f5f5f5;
`;

export const Selects = styled.div`
  flex-basis: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Select = styled.select`
  width: 32vw;
  height: 15vw;
  font-size: 6vw;
  margin: 0 2vw;
`;

export const Option = styled.option`
  font-size: 6vw;
`;
