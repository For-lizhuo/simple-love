export type LoginDto = {
  password: string;
};
export type UpdatePasswordDto = {
  password: string;
  token: string | undefined;
};
export type UpdateUserDto = {
  id: number;
  nickname?: string;
  avatar?: string;
  token: string | undefined;
};
export type AddAlbumDto = {
  title: string;
  privacy: boolean;
  token: string | undefined;
};
export type UpdateAlbumDto = {
  albumId: number;
  title?: string;
  privacy?: boolean;
  token: string | undefined;
};
export type RemoveAlbumDto = {
  id: number;
  token: string | undefined;
};
export type UploadPhotosDto = {
  albumId: number;
  sources: string[];
  token: string | undefined;
};
export type RemovePhotosDto = {
  photoIdList: number[];
  token: string | undefined;
};
export type AddAnniversaryDto = {
  date: string;
  detail: string;
  token: string | undefined;
};
export type RemoveAnniversaryDto = {
  id: number;
  token: string | undefined;
};
export type AddMessageDto = {
  detail: string;
};
export type AddTodoDto = {
  detail: string;
  complete: boolean;
  completeDate?: string;
  token: string | undefined;
};
export type UpdateTodoDto = {
  id: number;
  completeDate: string;
  token: string | undefined;
};
export type RemoveTodoDto = {
  id: number;
  token: string | undefined;
};
export type UploadEmoticonsDto = {
  sources: string[];
  token: string | undefined;
};
export type RemoveEmoticonDto = {
  id: number;
  token: string | undefined;
};
export type RemoveMessageDto = {
  id: number;
  token: string | undefined;
};
