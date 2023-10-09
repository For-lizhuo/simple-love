import axios from "axios";
import { baseApi } from "./config";
import { RemovePhotosDto, UploadPhotosDto } from "../types/dto";

export const uploadPhotos = (photos: UploadPhotosDto) => {
  const { albumId, sources, token } = photos;
  return axios.post(
    `${baseApi}/photo`,
    { albumId, sources },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const removePhotos = (removePhotosDto: RemovePhotosDto) => {
  const { photoIdList, token } = removePhotosDto;
  return axios.delete(`${baseApi}/photo/`, {
    data: { photoIdList },
    headers: {
      Authorization: token,
    },
  });
};
