/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Header } from "../../components/Header";
import { useLoaderData } from "react-router-dom";
import {
  Buttons,
  UploadBox,
  Box,
  Button,
  ButtonBox,
  PopUp,
  UploadTitle,
  FileInputBox,
  FileInputDetail,
  FileInput,
  Preview,
  UploadImgBox,
  UploadImg,
  Label,
  Radio,
  RadioBox,
  SettingBox,
  SettingButton,
  SettingButtonBox,
  SettingInput,
  SettingLabel,
  SettingTitle,
  Warn,
  FilterFC,
  Select,
  Selects,
  Option,
} from "./style";
import { ButtonFC } from "../../components/Button";
import { PhotoFC } from "../../components/Photo";
import { getPhotoButtons } from "../../constants/buttons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAlbum, updateAlbum } from "../../api/album";
import { AlbumType, ResError } from "../../types/resData";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectPopUp, switchPopUp } from "../../redux/features/photoSlice";
import { uploadPhotos } from "../../api/photo";
import { ProgressFC } from "../../components/Progress";
import { PictureFC } from "../../components/Picture";
import { processFile } from "../../utils/file";
import { selectLoginStatus, selectToken } from "../../redux/features/authSlice";
import { Title } from "../home/style";

// eslint-disable-next-line react-refresh/only-export-components
export function loader({ params }) {
  return params;
}

type LoaderData = { albumId: number };

export const UploadFC: React.FC = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const loaderData = useLoaderData();
  const albumId = (loaderData as LoaderData).albumId;
  const token = useAppSelector(selectToken);
  const [uploadImgs, setUploadImgs] = React.useState<
    (string | ArrayBuffer | null)[]
  >([]);
  const mutation = useMutation({
    mutationFn: uploadPhotos,
    onError(error) {
      const { status, statusText } = (error as ResError).response;
      throw new Response("", {
        status: status,
        statusText: statusText,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["album"] });
      dispatch(switchPopUp(null));
      setUploadImgs([]);
    },
  });
  const fileInputEvent: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const files = e.target.files;
    if (files === null) return;
    const base64Array = await Promise.all(
      Array.from(files).map((file) => processFile(file))
    );
    setUploadImgs(base64Array);
  };
  const cancelEvent: React.MouseEventHandler<HTMLDivElement> = () => {
    dispatch(switchPopUp(null));
    setUploadImgs([]);
  };
  const submitEvent: React.MouseEventHandler<HTMLDivElement> = async () => {
    if (!uploadImgs.length) return;
    mutation.mutate({
      albumId: albumId,
      sources: uploadImgs as string[],
      token,
    });
  };
  return (
    <>
      <UploadBox>
        <UploadTitle>上传照片</UploadTitle>
        <FileInputBox>
          <Label htmlFor="file">选择图片</Label>
          {uploadImgs.length > 0 ? (
            <FileInputDetail>{`已选择${uploadImgs.length}张图片`}</FileInputDetail>
          ) : null}
          <FileInput
            id="file"
            type="file"
            multiple
            accept="image/*"
            onChange={fileInputEvent}
          ></FileInput>
        </FileInputBox>
        <Preview>
          {uploadImgs.map((uploadImg, index) => (
            <UploadImgBox key={index}>
              <UploadImg src={String(uploadImg)} />
            </UploadImgBox>
          ))}
        </Preview>
        <ButtonBox>
          <Button onClick={cancelEvent}>取消</Button>
          <Button onClick={submitEvent} isAble={uploadImgs.length > 0}>
            上传
          </Button>
        </ButtonBox>
      </UploadBox>
    </>
  );
};
export const SettingFC: React.FC = () => {
  const loaderData = useLoaderData();
  const albumId = (loaderData as LoaderData).albumId;
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const {
    isLoading,
    isFetching,
    error,
    data: album,
  } = useQuery<AlbumType, ResError>({
    queryKey: ["album", { albumId: albumId }],
    queryFn: getAlbum,
  });
  const [input, setInput] = React.useState<string>(album?.title || "");
  const [radio, setRadio] = React.useState<boolean>(album?.privacy as boolean);
  const [warn, setWarn] = React.useState(false);
  const token = useAppSelector(selectToken);
  const mutation = useMutation({
    mutationFn: updateAlbum,
    onError(error: ResError) {
      const { status, statusText } = (error as ResError).response;
      setWarn(true);
      throw new Response("", {
        status: status,
        statusText: statusText,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["album"] });
      dispatch(switchPopUp(null));
    },
  });
  const cancelEvent: React.MouseEventHandler<HTMLDivElement> = () => {
    setInput(album?.title || "");
    setRadio(album?.privacy as boolean);
    dispatch(switchPopUp(null));
  };
  const submitEvent: React.MouseEventHandler<HTMLDivElement> = async () => {
    if (input === album?.title && radio === album.privacy) return;
    mutation.mutate({
      albumId,
      title: input,
      privacy: radio,
      token
    });
  };
  const inputEvent: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const input = e.target.value;
    setInput(input);
  };
  const radioEvent: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setRadio(e.target.value === "private" ? true : false);
  };
  if (isLoading) return <ProgressFC />;
  if (error) {
    const { status, statusText } = error.response;
    throw new Response("", {
      status: status,
      statusText: statusText,
    });
  }
  return (
    <>
      {isFetching ? <ProgressFC /> : null}
      <SettingBox>
        <SettingTitle>修改相册</SettingTitle>
        <SettingInput
          type="text"
          placeholder="输入相册名称"
          onChange={inputEvent}
          maxLength={8}
          value={input}
        ></SettingInput>
        <Warn isShown={warn}>名称已存在！</Warn>
        <RadioBox>
          <Radio
            type="radio"
            id="private"
            value="private"
            name="privacy"
            checked={radio}
            onChange={radioEvent}
          />
          <SettingLabel htmlFor="private">私密</SettingLabel>
          <Radio
            type="radio"
            id="public"
            value="public"
            name="privacy"
            checked={!radio}
            onChange={radioEvent}
          />
          <SettingLabel htmlFor="public">公开</SettingLabel>
        </RadioBox>
        <SettingButtonBox>
          <SettingButton onClick={cancelEvent}>取消</SettingButton>
          <SettingButton
            onClick={submitEvent}
            isAble={
              input !== "" && (input !== album.title || radio !== album.privacy)
            }
          >
            确定
          </SettingButton>
        </SettingButtonBox>
      </SettingBox>
    </>
  );
};

type Filter = {
  attr: "createTime";
  order: 1 | -1;
};

export const Photo: React.FC = () => {
  const loaderData = useLoaderData();
  const albumId = (loaderData as LoaderData).albumId;
  const dispatch = useAppDispatch();
  const popUp = useAppSelector(selectPopUp);
  const loginStatus = useAppSelector(selectLoginStatus);
  const [filter, setFilter] = React.useState<Filter>({
    attr: "createTime",
    order: 1,
  });
  const selectEvent: React.ChangeEventHandler<HTMLSelectElement>[] = [
    (e) => {
      const { value } = e.target as any;
      setFilter((preState) => {
        return {
          ...preState,
          attr: value,
        };
      });
      localStorage.setItem(
        "photo_filter",
        JSON.stringify({ ...filter, attr: value })
      );
    },
    (e) => {
      const { value } = e.target as any;
      setFilter((preState) => {
        return {
          ...preState,
          order: value,
        };
      });
      localStorage.setItem(
        "photo_filter",
        JSON.stringify({ ...filter, order: value })
      );
    },
  ];
  const buttonsClickEvent: Record<
    string,
    React.MouseEventHandler<HTMLDivElement>
  > = {
    upload: () => {
      if (!loginStatus) return;
      dispatch(switchPopUp("upload"));
    },
    filter: () => {
      dispatch(switchPopUp("filter"));
    },
    setting: () => {
      if (!loginStatus) return;
      dispatch(switchPopUp("setting"));
    },
  };
  const cancelEvent: React.MouseEventHandler<HTMLDivElement> = () => {
    dispatch(switchPopUp(null));
  };
  React.useEffect(() => {
    const album_filter = localStorage.getItem("album_filter");
    if (album_filter) {
      setFilter(JSON.parse(album_filter));
    }
  }, []);
  const {
    isLoading,
    isFetching,
    error,
    data: album,
  } = useQuery<AlbumType, ResError>({
    queryKey: ["album", { albumId: albumId }],
    queryFn: getAlbum,
  });
  if (isLoading) return <ProgressFC />;
  if (error) {
    const { status, statusText } = error.response;
    throw new Response("", {
      status: status,
      statusText: statusText,
    });
  }
  return (
    <>
      {isFetching ? <ProgressFC /> : null}
      <Box popUp={popUp}>
        <Header title={album.title} hasBack={true} hasBackHome={true}></Header>
        <Buttons>
          {getPhotoButtons(loginStatus).map(({ name, src }, index) => (
            <ButtonFC
              imgSrc={src}
              key={index}
              clickEvent={buttonsClickEvent[name]}
            />
          ))}
        </Buttons>
        {!loginStatus && album.privacy
          ? null
          : album.photos.map(({ id, source }) => {
              return (
                <PhotoFC photoSrc={source} photoId={id} key={id}></PhotoFC>
              );
            })}
      </Box>
      <PopUp popUp={popUp}>
        {popUp === "upload" ? (
          <UploadFC />
        ) : popUp === "setting" ? (
          <SettingFC />
        ) : popUp === "picture" ? (
          <PictureFC />
        ) : popUp === "filter" ? (
          <FilterFC>
            <Title>排序方式</Title>
            <Selects>
              <Select name="attr" value={filter.attr} onChange={selectEvent[0]}>
                <Option value="createTime">上传时间</Option>
              </Select>
              <Select
                name="order"
                value={filter.order}
                onChange={selectEvent[1]}
              >
                <Option value={1}>递增</Option>
                <Option value={-1}>递减</Option>
              </Select>
            </Selects>
            <ButtonBox>
              <Button onClick={cancelEvent} isAble={true}>
                关闭
              </Button>
            </ButtonBox>
          </FilterFC>
        ) : null}
      </PopUp>
    </>
  );
};
