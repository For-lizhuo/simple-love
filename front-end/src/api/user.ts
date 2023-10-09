import axios from "axios";
import { baseApi } from "./config";
import { UpdateUserDto } from "../types/dto";

export const getUserList = () =>
  axios.get(`${baseApi}/user`).then((res) => res.data);

export const updateUser = (updateUserDto: UpdateUserDto) => {
  const { id, nickname, avatar, token } = updateUserDto;
  return axios.patch(
    `${baseApi}/user/${id}`,
    { nickname, avatar },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};
