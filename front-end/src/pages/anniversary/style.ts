import styled from "styled-components";
import { AnniversaryPopUpType } from "../../types/common";

export const Box = styled.div<{ popUp: AnniversaryPopUpType }>`
  opacity: ${(props) => (props.popUp === null ? "1" : "0.2")};
`;

export const TipsBox = styled.div`
  background-color: #fff0f5;
  margin: 2.5vh auto;
  width: 60vw;
  height: 15vh;
  border: groove 5vw pink;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #d4237a;
  font-family: Consolas, "微软雅黑", "黑体";
`;

export const Buttons = styled.div`
  display: flex;
  height: 10vh;
  align-items: last baseline;
`;

export const Tips = styled.div`
  flex-basis: 10vw;
  font-size: 6vw;
  text-align: center;
`;

export const TimeLine = styled.div`
  margin:2vh 0 0 10vw;
  width: 80vw;
  height: fit-content;
  max-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  overflow: auto;
  position: relative;
`;

export const Line = styled.div<{ length: number }>`
  height: ${(props) => `${props.length}vw`};
  width: 2vw;
  background-color: pink;
  position: absolute;
  left: 4vw;
  top: 0vw;
  z-index: -1;
`;

export const DetailBox = styled.div`
  width: fit-content;
  flex-basis: 20vw;
  line-height: 20vw;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

export const Icon = styled.img`
  width: 10vw;
  height: 10vw;
  background-color: white;
  border-radius: 5vw;
`;

export const DateBox = styled.div`
  margin-left: 5vw;
  font-size: 5vw;
  color: pink;
  font-weight: bold;
`;

export const Detail = styled.div`
  margin-left: 5vw;
  font-size: 6vw;
  color: #d4237a;
`;

export const PopUp = styled.div<{ popUp: AnniversaryPopUpType }>`
  display: ${(props) => (props.popUp === null ? "none" : "flex")};
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

export const CalendarBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-basis: 8vh;
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

export const DeleteDetail = styled.div`
  flex-basis: 60%;
  font-size: 5vw;
  line-height: 6vw;
`;

export const DeleteDate = styled.div`
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
