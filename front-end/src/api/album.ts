import axios from "axios";
import { baseApi } from "./config";
import { AddAlbumDto, RemoveAlbumDto, UpdateAlbumDto } from "../types/dto";

export const getAlbumList = () =>
  axios.get(`${baseApi}/album`).then((res) => res.data);

export const getAlbum = async ({ queryKey }) => {
  const [, { albumId }] = queryKey;
  const res = await axios.get(`${baseApi}/album/${albumId}`);
  return res.data;
};

export const addAlbum = (addAlbumDto: AddAlbumDto) => {
  const { title, privacy, token } = addAlbumDto;
  return axios.post(
    `${baseApi}/album`,
    { title, privacy },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const updateAlbum = (updateAlbumDto: UpdateAlbumDto) => {
  const { albumId, title, privacy, token } = updateAlbumDto;
  return axios.patch(
    `${baseApi}/album/${albumId}`,
    { title, privacy },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const removeAlbum = (removeAlbumDto: RemoveAlbumDto) => {
  const { id, token } = removeAlbumDto;
  return axios.delete(`${baseApi}/album/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};
