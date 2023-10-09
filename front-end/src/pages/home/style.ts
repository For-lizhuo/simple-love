import styled from "styled-components";
import { HomePopUpType } from "../../types/common";

export const Box = styled.div<{ popUp: HomePopUpType }>`
  opacity: ${(props) => (props.popUp === null ? "1" : "0.2")};
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  width: 100vw;
  flex-basis: 40vh;
`;

export const Title = styled.div`
  flex-basis: 10vh;
  text-align: center;
  line-height: 10vh;
  font-size: 8vw;
`;

export const Detail = styled.div`
  flex: 1;
  display: flex;
`;

export const HeartBox = styled.div`
  flex: 1;
  background-image: url("/src/resources/heart.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Heart = styled.div`
  width: 60vw;
  height: 60vw;
  text-align: center;
  line-height: 60vw;
  font-size: 6vw;
`;

export const InfoBox = styled.div`
  flex-basis: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TopBox = styled.div`
  flex-basis: 50%;
  display: flex;
`;

export const BottomBox = styled.div`
  width: 100%;
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Nickname = styled.div`
  width: 100%;
  height: 15vw;
  line-height: 15vw;
  font-size: 6vw;
  font-weight: bold;
  text-align: center;
`;

export const Male = styled.div`
  height: 8vw;
  width: 8vw;
  background-image: url("/src/resources/male.png");
  background-repeat: no-repeat;
  background-size: contain;
`;

export const Female = styled.div`
  height: 8vw;
  width: 8vw;
  background-image: url("/src/resources/female.png");
  background-repeat: none;
  background-size: contain;
`;

export const Main = styled.main`
  flex-basis: content;
  display: flex;
  padding: 5vh 0;
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

export const UpdateBox = styled.div`
  display: flex;
  width: 80vw;
  height: fit-content;
  flex-direction: column;
  align-items: center;
  position: fixed;
  border-radius: 20px;
  top: 15vh;
  left: 10vw;
  background-color: #f5f5f5;
`;

export const UpdateFCTitle = styled.div`
  text-align: center;
  flex-basis: 10vh;
  line-height: 10vh;
  font-size: 8vw;
`;

export const UpdateInputBox = styled.div`
  flex-basis: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UpdateInputLabel = styled.label`
  width: 18vw;
  height: 6vh;
  line-height: 6vh;
  font-size: 6vw;
`;

export const UpdateInput = styled.input`
  width: 40vw;
  height: 6vh;
  background-color: #dcdcdc;
  padding: 0 2vw;
  border-bottom: 1px solid black;
  font-size: 6vw;
`;

export const UpdateAvatarBox = styled.div`
  flex-basis: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AvatarBox = styled.div`
  width: 44vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UpdateAvatar = styled.img`
  width: 8vh;
  height: 8vh;
  border-radius: 4vh;
  object-fit: cover;
`;

export const FileInputBox = styled.div`
  flex-basis: 10vh;
  display: flex;
  width: 62vw;
  align-items: center;
  justify-content: baseline;
`;

export const FileInputLabel = styled.label`
  width: 30vw;
  background-color: #dcdcdc;
  border-radius: 5vw;
  border: 1px solid;
  font-size: 5vw;
  text-align: center;
  height: 5vh;
  line-height: 5vh;
  color: black;
`;

export const FileInputDetail = styled.div`
  margin-left: 5vw;
  flex-basis: content;
  font-size: 4vw;
  height: 5vh;
  line-height: 5vh;
  color: #696969;
`;

export const FileInput = styled.input`
  flex-basis: 0vw;
`;
export const ButtonBox = styled.div`
  display: flex;
  flex-basis: 12vh;
  align-items: center;
  justify-content: center;
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

export const Footer = styled.footer`
  position: fixed;
  width: 100vw;
  bottom: 0vw;
  display: flex;
  justify-content: center;
  align-items: last baseline;
`;

export const Gif = styled.img`
  z-index: 1;
  width: 50vw;
  height: auto;
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

export const Label = styled.label`
  background-color: #b0e0e6;
  flex-basis: 24vw;
  border-radius: 5vw;
  font-size: 5vw;
  text-align: center;
  height: 5vh;
  line-height: 5vh;
  padding: 0 2vw;
  color: #696969;
`;

export const Preview = styled.div`
  flex-basis: content;

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

export const LogBox = styled.div`
  display: flex;
  width: 90vw;
  height: 42vh;
  flex-direction: column;
  align-items: center;
  position: fixed;
  border-radius: 20px;
  top: 29vh;
  left: 5vw;
  background-color: #f5f5f5;
  padding-bottom: 2vh;
`;

export const LogInputBox = styled.div`
  flex-basis: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogInputLabel = styled.label`
  width: 18vw;
  height: 6vh;
  line-height: 6vh;
  font-size: 6vw;
`;

export const LogInput = styled.input`
  width: 40vw;
  height: 6vh;
  background-color: #dcdcdc;
  padding: 0 2vw;
  border-bottom: 1px solid black;
  font-size: 6vw;
`;

export const RememberBox = styled.div`
  flex-basis: 10vh;
  display: flex;
  width: 100%;
  align-items: center;
`;

export const RememberCheck = styled.div<{ check: boolean }>`
  width: 8vw;
  height: 8vw;
  background-image: ${(props) =>
    props.check
      ? `url("/src/resources/check_square.png")`
      : `url("/src/resources/check_false.png")`};
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: 14vw;
`;

export const RememberLabel = styled.div`
  font-size: 5vw;
  line-height: 8vw;
  margin-left: 2vw;
`;

export const Warn = styled.div<{ passwordError: boolean }>`
  flex-basis: 5vh;
  line-height: 5vh;
  color: #ff4500;
  font-size: 5vw;
  visibility: ${(props) =>
    props.passwordError === true ? "visible" : "hidden"};
`;
