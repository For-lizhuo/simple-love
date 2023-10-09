import { AnniversaryType } from "./resData";

export type BalloonFCProps = {
  name: string;
  path: string;
};
export type HeaderFCProps = {
  title: string;
  hasBack?: boolean;
  hasBackHome?: boolean;
};
export type AlbumFCProps = {
  title: string;
  src?: string;
  id: number;
  quantity: number;
  privacy: boolean;
};
export type ButtonFCProps = {
  imgSrc: string;
  clickEvent: React.MouseEventHandler<HTMLDivElement>;
};
export type AvatarFCProps = {
  avatarSrc: string;
};
export type PhotoFCProps = {
  photoSrc: string;
  photoId: number;
};
export type AlbumAddFCProps = {
  albumList: string[];
};
export type AlbumDeleteFCProps = {
  albumList: Array<Pick<AlbumFCProps, "id" | "title" | "quantity">>;
};
export type AnniversaryDeleteFCProps = {
  anniversary: AnniversaryType[];
};
export type TodoCompleteFCProps = {
  id: number;
  detail: string;
};
export type HomeUpdateFCProps = {
  id: number;
  nickname: string;
  avatar: string;
  gender: string;
};
export type TodoLotteryProps = {
  todoList: string[];
};
