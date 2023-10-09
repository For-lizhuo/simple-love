import axios from "axios";
import { baseApi } from "./config";
import { RemoveEmoticonDto, UploadEmoticonsDto } from "../types/dto";

export const getEmoticon = async () => {
  const res = await axios.get(`${baseApi}/emoticon`);
  return res.data;
};

export const uploadEmoticons = (uploadEmoticonsDto: UploadEmoticonsDto) => {
  const { sources, token } = uploadEmoticonsDto;
  return axios.post(
    `${baseApi}/emoticon`,
    { sources },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const removeEmoticon = (removeEmoticonDto: RemoveEmoticonDto) => {
  const { id, token } = removeEmoticonDto;
  return axios.delete(`${baseApi}/emoticon/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};
