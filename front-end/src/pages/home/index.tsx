/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from "react";
import {
  Header,
  Title,
  Detail,
  HeartBox,
  Heart,
  Main,
  Footer,
  InfoBox,
  BottomBox,
  Nickname,
  TopBox,
  Female,
  Male,
  UpdateBox,
  UpdateInput,
  UpdateFCTitle,
  ButtonBox,
  Button,
  PopUp,
  Box,
  UpdateInputLabel,
  UpdateInputBox,
  UpdateAvatarBox,
  UpdateAvatar,
  AvatarBox,
  FileInputBox,
  FileInputLabel,
  FileInput,
  FileInputDetail,
  Gif,
  Label,
  Preview,
  UploadBox,
  UploadImg,
  UploadImgBox,
  UploadTitle,
  LogBox,
  LogInput,
  LogInputBox,
  LogInputLabel,
  Warn,
  RememberLabel,
  RememberBox,
  RememberCheck,
} from "./style";
import { balloons } from "../../constants/routes";
import { Balloon } from "../../components/Balloon";
import { AvatarFC } from "../../components/Avatar";
import { getDaysBetweenDates } from "../../utils/date";
import { BeInLoveDate } from "../../constants/anniversary";
import { getUserList, updateUser } from "../../api/user";
import { EmoticonType, ResError, UserType } from "../../types/resData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProgressFC } from "../../components/Progress";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectPopUp, switchPopUp } from "../../redux/features/homeSlice";
import { HomeUpdateFCProps } from "../../types/FCProps";
import { processFile } from "../../utils/file";
import { getEmoticon, uploadEmoticons } from "../../api/emoticon";
import { loginApi } from "../../api/auth";
import {
  login,
  selectLoginStatus,
  selectToken,
} from "../../redux/features/authSlice";

export const LogFC: React.FC = () => {
  const [input, setInput] = React.useState<string>("");
  const [check, setCheck] = React.useState<boolean>(true);
  const [passwordError, setPasswordError] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const mutation = useMutation({
    mutationFn: loginApi,
    onError() {
      setPasswordError(true);
    },
    onSuccess(data) {
      dispatch(switchPopUp(null));
      dispatch(login(data.data.access_token));
      localStorage.setItem("password", input);
    },
  });
  const cancelEvent: React.MouseEventHandler<HTMLDivElement> = () => {
    dispatch(switchPopUp(null));
  };
  const submitEvent: React.MouseEventHandler<HTMLDivElement> = async () => {
    if (input !== "") {
      mutation.mutate({
        password: input,
      });
    }
  };
  const inputEvent: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const input = e.target.value;
    setInput(input);
  };
  React.useEffect(() => {
    const password = localStorage.getItem("password");
    if (password) {
      setInput(password);
    }
  }, []);
  return (
    <LogBox>
      <Title>登录</Title>
      <LogInputBox>
        <LogInputLabel>密码:</LogInputLabel>
        <LogInput
          type="text"
          placeholder="输入密码"
          onChange={inputEvent}
          maxLength={12}
          value={input}
        />
      </LogInputBox>
      <RememberBox>
        <RememberCheck
          check={check}
          onClick={() => {
            setCheck((pre) => !pre);
          }}
        />
        <RememberLabel>记住密码</RememberLabel>
      </RememberBox>
      <Warn passwordError={passwordError}>密码错误，请重新输入</Warn>
      <ButtonBox>
        <Button onClick={cancelEvent}>游客访问</Button>
        <Button onClick={submitEvent} isAble={input !== ""}>
          登录
        </Button>
      </ButtonBox>
    </LogBox>
  );
};

export const UpdateFC: React.FC<HomeUpdateFCProps> = ({
  id,
  nickname,
  avatar,
}) => {
  const [input, setInput] = React.useState<string>(nickname);
  const [uploadImg, setUploadImg] = React.useState<string | ArrayBuffer | null>(
    avatar
  );
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUser,
    onError(error) {
      const { status, statusText } = (error as ResError).response;
      throw new Response("", {
        status: status,
        statusText: statusText,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
      dispatch(switchPopUp(null));
    },
  });
  const cancelEvent: React.MouseEventHandler<HTMLDivElement> = () => {
    dispatch(switchPopUp(null));
  };
  const submitEvent: React.MouseEventHandler<HTMLDivElement> = async () => {
    if (input !== "" && (input !== nickname || uploadImg !== avatar)) {
      mutation.mutate({
        id: id,
        nickname: input,
        avatar: uploadImg as string,
        token,
      });
    }
  };
  const inputEvent: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const input = e.target.value;
    setInput(input);
  };
  const fileInputEvent: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (e.target.files === null) return;
    const file = e.target.files[0];
    const base64 = await processFile(file);
    setUploadImg(base64);
  };
  return (
    <UpdateBox>
      <UpdateFCTitle>修改信息</UpdateFCTitle>
      <UpdateInputBox>
        <UpdateInputLabel>昵称:</UpdateInputLabel>
        <UpdateInput
          type="text"
          placeholder="输入昵称"
          onChange={inputEvent}
          maxLength={12}
          value={input}
        />
      </UpdateInputBox>
      <UpdateAvatarBox>
        <UpdateInputLabel>头像:</UpdateInputLabel>
        <AvatarBox>
          <UpdateAvatar src={uploadImg as string} />
        </AvatarBox>
      </UpdateAvatarBox>
      <FileInputBox>
        <FileInputLabel htmlFor="file">本地上传</FileInputLabel>
        {uploadImg !== avatar ? (
          <FileInputDetail>{`上传成功`}</FileInputDetail>
        ) : null}
        <FileInput
          id="file"
          type="file"
          accept="image/*"
          onChange={fileInputEvent}
        ></FileInput>
      </FileInputBox>
      <ButtonBox>
        <Button onClick={cancelEvent}>取消</Button>
        <Button
          onClick={submitEvent}
          isAble={input !== "" && (input !== nickname || uploadImg !== avatar)}
        >
          确定
        </Button>
      </ButtonBox>
    </UpdateBox>
  );
};

export const UploadFC: React.FC = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const token = useAppSelector(selectToken);
  const [uploadImgs, setUploadImgs] = React.useState<
    (string | ArrayBuffer | null)[]
  >([]);
  const mutation = useMutation({
    mutationFn: uploadEmoticons,
    onError(error) {
      const { status, statusText } = (error as ResError).response;
      throw new Response("", {
        status: status,
        statusText: statusText,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["emoticon"] });
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
      sources: uploadImgs as string[],
      token,
    });
  };
  return (
    <>
      <UploadBox>
        <UploadTitle>上传图片</UploadTitle>
        <FileInputBox>
          <Label htmlFor="file">选择图片</Label>
          {uploadImgs.length > 0 ? (
            <FileInputDetail>{`已选择${uploadImgs.length}张`}</FileInputDetail>
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

export const Home: React.FC = () => {
  const [duration, setDuration] = React.useState<number>(1);
  const [content, setContent] = React.useState<"duration" | "anniversary">(
    "duration"
  );
  const [updateUser, setUpdateUser] = React.useState<UserType>({
    id: 1,
    nickname: "",
    avatar: "",
    gender: "",
  });
  const popUp = useAppSelector(selectPopUp);
  const loginStatus = useAppSelector(selectLoginStatus);
  const dispatch = useAppDispatch();
  const {
    isLoading,
    isFetching,
    error,
    data: userList,
  } = useQuery<UserType[], ResError>({
    queryKey: ["userList"],
    queryFn: getUserList,
  });
  const {
    isLoading: loading,
    isFetching: fetching,
    error: err,
    data: emoticon,
  } = useQuery<EmoticonType, ResError>({
    queryKey: ["emoticon"],
    queryFn: getEmoticon,
  });
  const clickHeart: React.MouseEventHandler<HTMLDivElement> = () => {
    if (content === "duration") {
      setContent("anniversary");
    } else {
      setContent("duration");
    }
  };
  React.useEffect(() => {
    setDuration(getDaysBetweenDates(new Date(), BeInLoveDate));
  }, []);
  if (isLoading || loading) return <ProgressFC />;
  if (error) {
    const { status, statusText } = error.response;
    throw new Response("", {
      status: status,
      statusText: statusText,
    });
  }
  if (err) {
    const { status, statusText } = err.response;
    throw new Response("", {
      status: status,
      statusText: statusText,
    });
  }
  return (
    <>
      {isFetching || fetching ? <ProgressFC /> : null}
      <Box popUp={popUp}>
        <Header>
          <Title>Simple Love</Title>
          <Detail>
            <InfoBox
              onClick={() => {
                if (!loginStatus) return;
                setUpdateUser(userList[0]);
                dispatch(switchPopUp("update"));
              }}
            >
              <TopBox>
                <AvatarFC avatarSrc={userList[0].avatar} />
              </TopBox>
              <BottomBox>
                <Nickname>{userList[0].nickname}</Nickname>
                <Male />
              </BottomBox>
            </InfoBox>
            <HeartBox>
              <Heart onClick={clickHeart}>
                {content === "duration"
                  ? `在一起${duration}天`
                  : `2023/5/20相恋`}
              </Heart>
            </HeartBox>
            <InfoBox
              onClick={() => {
                setUpdateUser(userList[1]);
                dispatch(switchPopUp("update"));
              }}
            >
              <TopBox>
                <AvatarFC avatarSrc={userList[1].avatar} />
              </TopBox>
              <BottomBox>
                <Nickname>{userList[1].nickname}</Nickname>
                <Female />
              </BottomBox>
            </InfoBox>
          </Detail>
        </Header>
        <Main>
          {balloons.map(({ name, path }, index) => (
            <Balloon name={name} path={path} key={index}></Balloon>
          ))}
        </Main>
        <Footer
          onClick={() => {
            if (!loginStatus) return;
            dispatch(switchPopUp("upload"));
          }}
        >
          <Gif src={emoticon?.source || "src/resources/dog.gif"} />
        </Footer>
      </Box>
      {popUp ? (
        <PopUp>
          {popUp === "update" ? (
            <UpdateFC
              id={updateUser!.id}
              nickname={updateUser!.nickname}
              avatar={updateUser!.avatar}
              gender={updateUser!.gender}
            />
          ) : popUp === "upload" ? (
            <UploadFC />
          ) : popUp === "log" ? (
            <LogFC />
          ) : null}
        </PopUp>
      ) : null}
    </>
  );
};
