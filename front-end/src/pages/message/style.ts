import styled from "styled-components";

export const SendBox = styled.div`
  margin: 0 auto;
  width: 90vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  width: 60vw;
  height: 6vh;
  border-radius: 2vh;
  background-color: #f5f5f5;
  padding: 0 5vw;
  font-size: 5vw;
`;

export const Submit = styled.div<{ isAble: boolean }>`
  margin-left: 5vw;
  width: 10vw;
  height: 10vw;
  line-height: 6vh;
  text-align: center;
  font-size: 6vw;
  background-image: ${(props) =>
    props.isAble === true
      ? `url("/src/resources/send.png")`
      : `url("/src/resources/send_disable.png")`};
  background-repeat: no-repeat;
  background-size: contain;
  box-shadow: 1vw 1vw rgba(192, 192, 192, 0.4);
`;

export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: fit-content;
  min-height: 8vh;
  border-bottom: 1px solid grey;
  padding: 2vw 0;
  &:last-child {
    border: none;
  }
`;

export const DetailBox = styled.div`
  display: flex;
  height: fit-content;
  min-height: 5vh;
`;

export const Detail = styled.div`
  margin-left: 5vw;
  width: 80vw;
  font-size: 5vw;
  line-height: 5vh;
`;

export const Floor = styled.div`
  width: 10vw;
  font-size: 5vw;
  line-height: 5vh;
  font-weight: bold;
  margin-left: 2vw;
`;

export const DetailBottomBox = styled.div`
  display: flex;
  margin-top: 3vw;
  margin-left: 5vw;
  height: 6vw;
`;

export const DateTimeBox = styled.div`
  display: flex;
  font-size: 4vw;
  color: gray;
  width: 82vw;
  height: 6vw;
  line-height: 6vw;
`;

export const DateBox = styled.div``;

export const TimeBox = styled.div`
  margin-left: 4vw;
`;

export const DeleteBox = styled.div`
  background-image: url("/src/resources/delete_fill.png");
  width: 6vw;
  height: 6vw;
  background-size: contain;
  background-repeat: none;
  box-shadow: 0.5vw 0.5vw rgba(192, 192, 192, 0.4);
`;
