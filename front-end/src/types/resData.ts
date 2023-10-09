export type ResError = {
  response: Response;
};
export type UserType = {
  id: number;
  nickname: string;
  avatar: string;
  gender: string;
};
export type PhotoType = {
  id: number;
  source: string;
  date: string;
};
export type AlbumType = {
  id: number;
  title: string;
  createTime: Date;
  privacy: boolean;
  photos: PhotoType[];
  quantity: number;
  cover: string;
};
export type AnniversaryType = {
  date: string;
  detail: string;
  id: number;
};
export type MessageType = {
  id: number;
  detail: string;
  createTime: Date;
};
export type TodoType = {
  id: number;
  detail: string;
  createTime: Date;
  completeDate: string;
  complete: boolean;
};
export type EmoticonType = {
  id: number;
  source: string;
};
