import axios from "axios";
import { baseApi } from "./config";
import { AddAnniversaryDto, RemoveAnniversaryDto } from "../types/dto";

export const getAnniversary = () =>
  axios.get(`${baseApi}/anniversary`).then((res) => res.data);

export const addAnniversary = (addAnniversaryDto: AddAnniversaryDto) => {
  const { date, detail, token } = addAnniversaryDto;
  return axios.post(
    `${baseApi}/anniversary`,
    { date, detail },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const removeAnniversary = (
  removeAnniversaryDto: RemoveAnniversaryDto
) => {
  const { id, token } = removeAnniversaryDto;
  return axios.delete(`${baseApi}/anniversary/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};
