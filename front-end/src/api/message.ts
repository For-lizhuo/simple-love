import axios from "axios";
import { baseApi } from "./config";
import { AddMessageDto, RemoveMessageDto } from "../types/dto";

export const getMessage = () =>
  axios.get(`${baseApi}/message`).then((res) => res.data);

export const addMessage = (addMessageDto: AddMessageDto) =>
  axios.post(`${baseApi}/message`, addMessageDto);

export const removeMessage = (removeMessageDto: RemoveMessageDto) => {
  const { id, token } = removeMessageDto;
  return axios.delete(`${baseApi}/message/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};
