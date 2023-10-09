import styled from "styled-components";
import { TodoPopUpType } from "../../types/common";

export const Box = styled.div<{ popUp: TodoPopUpType }>`
  opacity: ${(props) => (props.popUp === null ? "1" : "0.2")};
`;
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  height: 10vh;
`;
export const PopUp = styled.div<{ popUp: TodoPopUpType }>`
  display: ${(props) => (props.popUp === null ? "none" : "flex")};
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
export const Main = styled.div`
  width: 90vw;
  height: fit-content;
  margin: 2vh auto;
  border: 1px solid gray;
  background-color: #f5f5f5;
  border-radius: 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const ChooseBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vw;
`;
export const Choose = styled.div`
  flex-basis: 33.3%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  line-height: 5vh;
`;
export const Radio = styled.input`
  width: 5vw;
  height: 5vw;
`;
export const Label = styled.div`
  font-size: 5vw;
  margin-left: 1vw;
`;
export const TodoBox = styled.div`
  width: 80vw;
  height: 40vw;
  border: 1.5vw double #a9a9a9;
  border-radius: 5vw;
  margin-bottom: 5vw;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: white;
`;
export const Detail = styled.div`
  margin-top: 4vw;
  width: 60vw;
  flex-basis: 30vw;
  line-height: 8vw;
  margin-left: 5vw;
  font-size: 5vw;
`;
export const CompleteDate = styled.div<{ complete: boolean }>`
  flex-basis: 10vw;
  margin-left: 5vw;
  font-size: 4vw;
  color: ${(props) => (props.complete ? "#F08080" : "#808080")};
`;
export const DeleteButton = styled.div`
  width: 6vw;
  height: 6vw;
  background-image: url("/src/resources/delete_fill.png");
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  left: 70vw;
  top: 4vw;
`;
export const CompleteButton = styled.div<{ complete: boolean }>`
  width: 6vw;
  height: 6vw;
  background-image: ${(props) =>
    props.complete
      ? `url("/src/resources/check_square.png")`
      : `url("/src/resources/check_false.png")`};
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  left: 70vw;
  top: 31vw;
`;
export const CompleteBox = styled.div`
  display: flex;
  width: 80vw;
  height: fit-content;
  flex-direction: column;
  align-items: center;
  position: fixed;
  border-radius: 20px;
  top: 30vh;
  left: 10vw;
  background-color: #f5f5f5;
`;
export const CompleteTitle = styled.div`
  text-align: center;
  flex-basis: 10vh;
  line-height: 10vh;
  font-size: 6vw;
`;
export const Title = styled.div`
  text-align: center;
  flex-basis: 12vh;
  line-height: 12vh;
  font-size: 8vw;
`;
export const CalendarBox = styled.div`
  width: fit-content;
  flex-basis: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ButtonBox = styled.div`
  flex-basis: 12vh;
  display: flex;
  align-items: center;
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
export const AddBox = styled.div`
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
`;
export const AddInput = styled.input`
  width: 56vw;
  flex-basis: 8vh;
  background-color: #dcdcdc;
  padding: 0 6vw;
  border-radius: 4vh;
  font-size: 5vw;
`;
export const AddFCRadioBox = styled.div`
  width: 68vw;
  flex-basis: 10vh;
  display: flex;
  align-items: center;
`;
export const AddFCRadio = styled.input`
  flex-basis: 15%;
  width: 5vw;
  height: 5vw;
`;
export const AddFCLabel = styled.label`
  flex-basis: 35%;
  font-size: 6vw;
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
export const LotteryBox = styled.div`
  display: flex;
  width: 90vw;
  height: 50vh;
  flex-direction: column;
  align-items: center;
  position: fixed;
  border-radius: 20px;
  top: 20vh;
  left: 5vw;
  background-color: #f5f5f5;
`;

export const Lottery = styled.div`
  margin: 5vh 0;
  width: 70vw;
  height: 31vh;
  border: 2vw double black;
  border-radius: 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const TopBox = styled.div`
  border-radius: 5vw 5vw 0 0;
  width: 65vw;
  flex-basis: 10vh;
  border: 1vw solid gray;
  margin-top: 1vh;
`;
export const MiddleBox = styled.div`
  width: 65vw;
  flex: 1;
`;
export const BottomBox = styled.div`
  border-radius: 0 0 5vw 5vw;
  width: 65vw;
  flex-basis: 10vh;
  border: 1vw solid grey;
  margin-bottom: 1vh;
`;

export const Ul = styled.div`
  position: absolute;
  //background-color: yellow;
  height: inherit;
  width: inherit;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Li = styled.div`
  flex: 1;
  line-height: 6vh;
  font-size: 5vw;
`;

export const ArrowToRight = styled.div`
  width: 20vw;
  height: 8vh;
  background-image: url("src/resources/arrow_to_right.png");
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  top: 11vh;
  left: -6vw;
`;

export const ArrowToLeft = styled.div`
  width: 20vw;
  height: 8vh;
  background-image: url("src/resources/arrow_to_left.png");
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  top: 11vh;
  left: 59vw;
`;

export const StartOrStopBtn = styled.div`
  width: 25vw;
  height: 5vh;
  font-size: 5vw;
  line-height: 5vh;
  text-align: center;
  box-shadow: 1vw 1vw rgba(128, 128, 128, 1);
`;

export const CloseBtn = styled.div`
  width: 8vw;
  height: 8vw;
  background-image: url("/src/resources/close.png");
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  right: 2vw;
  top: 2vw;
`;
