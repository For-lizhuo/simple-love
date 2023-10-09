import {
  AlbumPopUpType,
  AnniversaryPopUpType,
  HomePopUpType,
  PhotoPopUpType,
  TodoPopUpType,
} from "../../types/common";
import { PictureInfo } from "../../types/payloadAction";

export interface AuthState {
  loginStatus: boolean;
  token?: string;
}

export interface HomeState {
  popUp: HomePopUpType;
}

export interface AlbumState {
  popUp: AlbumPopUpType;
}

export interface PhotoState {
  popUp: PhotoPopUpType;
  pictureInfo: PictureInfo;
}

export interface AnniversaryState {
  popUp: AnniversaryPopUpType;
}

export interface TodoState {
  popUp: TodoPopUpType;
}
