import axios from "axios";
import { baseApi } from "./config";
import { AddTodoDto, RemoveTodoDto, UpdateTodoDto } from "../types/dto";

export const getTodo = () =>
  axios.get(`${baseApi}/todo`).then((res) => res.data);

export const addTodo = (addTodoDto: AddTodoDto) => {
  if (addTodoDto.complete) {
    const { detail, complete, completeDate, token } = addTodoDto;
    return axios.post(
      `${baseApi}/todo`,
      { detail, complete, completeDate },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } else {
    const { detail, complete, token } = addTodoDto;
    return axios.post(
      `${baseApi}/todo`,
      { detail, complete },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
};

export const updateTodo = (updateTodoDto: UpdateTodoDto) => {
  const { id, completeDate, token } = updateTodoDto;
  return axios.patch(
    `${baseApi}/todo/${id}`,
    { completeDate },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const removeTodo = (removeTodoDto: RemoveTodoDto) => {
  const { id, token } = removeTodoDto;
  return axios.delete(`${baseApi}/todo/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};
