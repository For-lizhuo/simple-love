import styled from "styled-components";
import { PhotoPopUpType } from "../../types/common";

export const Box = styled.div<{ popUp: PhotoPopUpType }>`
  opacity: ${(props) => (props.popUp === null ? "1" : "0.2")};
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  height: 10vh;
`;

export const PopUp = styled.div<{ popUp: PhotoPopUpType }>`
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

export const UploadBox = styled.div`
  display: flex;
  width: 80vw;
  padding: 0 2vw;
  height: fit-content;
  flex-direction: column;
  align-items: center;
  position: fixed;
  border-radius: 20px;
  top: 20vh;
  left: 8vw;
  background-color: #f5f5f5;
`;

export const UploadTitle = styled.div`
  text-align: center;
  margin: 2vh 0;
  flex-basis: 5vh;
  line-height: 5vh;
  font-size: 3vh;
`;

export const FileInputBox = styled.div`
  flex-basis: 6vh;
  display: flex;
  align-items: center;
  margin-bottom: 2vh;
`;

export const Label = styled.label`
  background-color: #b0e0e6;
  margin-left: 8vw;
  flex-basis: 24vw;
  border-radius: 5vw;
  font-size: 5vw;
  text-align: center;
  height: 5vh;
  line-height: 5vh;
  padding: 0 2vw;
  color: #696969;
`;

export const FileInputDetail = styled.div`
  margin-left: 5vw;
  flex-basis: content;
  font-size: 4vw;
  height: 5vh;
  line-height: 5vh;
  color: #808080;
`;

export const FileInput = styled.input`
  flex: 1;
  visibility: hidden;
`;

export const Preview = styled.div`
  flex-basis: content;
  margin-bottom: 2vh;
`;

export const UploadImgBox = styled.div`
  width: 18vw;
  height: 18vw;
  margin: 1vw;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const UploadImg = styled.img`
  width: 17vw;
  height: 17vw;
  object-fit: cover;
  padding: 0.5vw;
  border: 1px solid gray;
`;

export const ButtonBox = styled.div`
  flex-basis: 8vh;
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

export const SettingBox = styled.div`
  display: flex;
  width: 80vw;
  height: 40vh;
  flex-direction: column;
  align-items: center;
  position: absolute;
  border-radius: 20px;
  top: 30vh;
  left: 10vw;
  background-color: #f5f5f5;
`;

export const SettingTitle = styled.div`
  text-align: center;
  flex-basis: 10vh;
  line-height: 10vh;
  font-size: 8vw;
`;

export const SettingInput = styled.input`
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

export const SettingLabel = styled.label`
  flex-basis: 25%;
  font-size: 6vw;
`;

export const SettingButtonBox = styled.div`
  flex: 1;
  display: flex;
`;

export const SettingButton = styled.div<{ isAble?: boolean }>`
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
export const FilterFC = styled.div`
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
