import * as React from "react";
import { Header } from "../../components/Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addMessage, getMessage, removeMessage } from "../../api/message";
import { ProgressFC } from "../../components/Progress";
import { MessageType, ResError } from "../../types/resData";
import {
  DateBox,
  DateTimeBox,
  DeleteBox,
  Detail,
  DetailBottomBox,
  DetailBox,
  Floor,
  Input,
  MessageBox,
  SendBox,
  Submit,
  TimeBox,
} from "./style";
import { DateFormat, TimeFormat } from "../../utils/date";
import { useAppSelector } from "../../hooks";
import { selectLoginStatus, selectToken } from "../../redux/features/authSlice";
export const Message: React.FC = () => {
  const loginStatus = useAppSelector(selectLoginStatus);
  const [input, setInput] = React.useState("");
  const token = useAppSelector(selectToken);
  const queryClient = useQueryClient();
  const mutation_add = useMutation({
    mutationFn: addMessage,
    onError(error) {
      const { status, statusText } = (error as ResError).response;
      throw new Response("", {
        status: status,
        statusText: statusText,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["message"] });
      setInput("");
    },
  });
  const mutation_delete = useMutation({
    mutationFn: removeMessage,
    onError(error) {
      const { status, statusText } = (error as ResError).response;
      throw new Response("", {
        status: status,
        statusText: statusText,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["message"] });
      setInput("");
    },
  });
  const inputEvent: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const input = e.target.value;
    setInput(input);
  };
  const submitEvent: React.MouseEventHandler<HTMLDivElement> = () => {
    if (input === "") return;
    mutation_add.mutate({ detail: input });
  };
  const {
    isLoading,
    isFetching,
    error,
    data: message,
  } = useQuery<MessageType[], ResError>({
    queryKey: ["message"],
    queryFn: getMessage,
  });
  if (isLoading) return <ProgressFC />;
  if (error) {
    const { status, statusText } = error.response;
    throw new Response("", {
      status: status,
      statusText: statusText,
    });
  }
  return (
    <>
      <Header title="留言板" hasBack={true} hasBackHome={true}></Header>
      <SendBox>
        <Input
          type="text"
          size={50}
          placeholder="写下想说的话吧"
          onChange={inputEvent}
          value={input}
        />
        <Submit isAble={input !== ""} onClick={submitEvent} />
      </SendBox>
      {isFetching ? (
        <ProgressFC />
      ) : (
        message.map(({ id, detail, createTime }) => {
          return (
            <MessageBox key={id}>
              <DetailBox>
                <Detail>{detail}</Detail>
                <Floor>#{id}</Floor>
              </DetailBox>
              <DetailBottomBox>
                <DateTimeBox>
                  <DateBox>{DateFormat(new Date(createTime))}</DateBox>
                  <TimeBox>{TimeFormat(new Date(createTime))}</TimeBox>
                </DateTimeBox>
                {loginStatus ? (
                  <DeleteBox
                    onClick={() => {
                      if (!loginStatus) return;
                      mutation_delete.mutate({ id, token });
                    }}
                  />
                ) : null}
              </DetailBottomBox>
            </MessageBox>
          );
        })
      )}
    </>
  );
};
