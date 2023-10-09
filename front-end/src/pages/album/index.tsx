/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Header } from "../../components/Header";
import { AlbumFC } from "../../components/Album";
import {
  Box,
  Buttons,
  PopUp,
  AddBox,
  Title,
  AddInput,
  Warn,
  Label,
  Radio,
  RadioBox,
  ButtonBox,
  Button,
  DeleteBox,
  DeleteWarn,
  DeleteButton,
  List,
  ListBox,
  DeleteLabel,
  AlbumQuantity,
  FilterFC,
  Selects,
  Select,
  Option,
} from "./style";
import { ButtonFC } from "../../components/Button";
import { getAlbumButtons } from "../../constants/buttons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addAlbum, getAlbumList, removeAlbum } from "../../api/album";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectPopUp, switchPopUp } from "../../redux/features/albumSlice";
import { AlbumAddFCProps, AlbumDeleteFCProps } from "../../types/FCProps";
import { AlbumType, ResError } from "../../types/resData";
import { ProgressFC } from "../../components/Progress";
import { selectLoginStatus, selectToken } from "../../redux/features/authSlice";
import { AddAlbumDto } from "../../types/dto";

export const AddFC: React.FC<AlbumAddFCProps> = ({ albumList }) => {
  const [input, setInput] = React.useState<string>("");
  const [radio, setRadio] = React.useState<"private" | "public">("private");
  const [warn, setWarn] = React.useState(false);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addAlbum,
    //乐观更新
    onMutate: async (newAlbum: AddAlbumDto) => {
      await queryClient.cancelQueries({ queryKey: ["albumList"] });
      const previousAlbumList = queryClient.getQueryData([
        "albumList",
      ]) as AlbumType[];
      queryClient.setQueryData(["albumList"], () => [
        ...previousAlbumList,
        newAlbum,
      ]);
      return { previousAlbumList };
    },
    onError(error) {
      const { status, statusText } = (error as ResError).response;
      throw new Response("", {
        status: status,
        statusText: statusText,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["albumList"] });
      setInput("");
      setRadio("private");
      dispatch(switchPopUp(null));
    },
  });
  const cancelEvent: React.MouseEventHandler<HTMLDivElement> = () => {
    setInput("");
    setRadio("private");
    dispatch(switchPopUp(null));
  };
  const submitEvent: React.MouseEventHandler<HTMLDivElement> = async () => {
    if (input === "") return;
    if (warn) return;
    mutation.mutate({
      title: input,
      privacy: radio === "private" ? true : false,
      token: token,
    });
  };
  const inputEvent: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const input = e.target.value;
    setInput(input);
    setWarn(albumList.includes(input));
  };
  const radioEvent: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setRadio(e.target.value as "private" | "public");
  };
  return (
    <AddBox>
      <Title>新建相册</Title>
      <AddInput
        type="text"
        placeholder="输入相册名称"
        onChange={inputEvent}
        maxLength={8}
        value={input}
      ></AddInput>
      <Warn isShown={warn}>名称已存在！</Warn>
      <RadioBox>
        <Radio
          type="radio"
          id="private"
          value="private"
          name="privacy"
          defaultChecked
          onChange={radioEvent}
        />
        <Label htmlFor="private">私密</Label>
        <Radio
          type="radio"
          id="public"
          value="public"
          name="privacy"
          onChange={radioEvent}
        />
        <Label htmlFor="public">公开</Label>
      </RadioBox>
      <ButtonBox>
        <Button onClick={cancelEvent}>取消</Button>
        <Button onClick={submitEvent} isAble={input !== "" && !warn}>
          确定
        </Button>
      </ButtonBox>
    </AddBox>
  );
};
export const DeleteFC: React.FC<AlbumDeleteFCProps> = ({ albumList }) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const token = useAppSelector(selectToken);
  const mutation = useMutation({
    mutationFn: removeAlbum,
    onError(error) {
      const { status, statusText } = (error as ResError).response;
      throw new Response("", {
        status: status,
        statusText: statusText,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["albumList"] });
      dispatch(switchPopUp(null));
    },
  });
  const backEvent: React.MouseEventHandler<HTMLDivElement> = () => {
    dispatch(switchPopUp(null));
  };
  const deleteEvent: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const { id } = e.target as any;
    mutation.mutate({ id: Number(id), token });
  };
  return (
    <DeleteBox>
      <Title>删除相册</Title>
      <DeleteWarn>删除相册会清空该相册内所有图片!</DeleteWarn>
      <ListBox>
        {albumList.map(({ id, title, quantity }) => (
          <List key={id}>
            <DeleteLabel htmlFor={`${id}`}>{title}</DeleteLabel>
            <AlbumQuantity>{`${quantity}张`}</AlbumQuantity>
            <DeleteButton onClick={deleteEvent} id={`${id}`}></DeleteButton>
          </List>
        ))}
      </ListBox>
      <ButtonBox>
        <Button onClick={backEvent} isAble={true}>
          返回
        </Button>
      </ButtonBox>
    </DeleteBox>
  );
};

type Filter = {
  attr: "createTime" | "quantity" | "title";
  order: 1 | -1;
};

export const Album: React.FC = () => {
  const {
    isLoading,
    isFetching,
    error,
    data: albumList,
  } = useQuery<AlbumType[], ResError>({
    queryKey: ["albumList"],
    queryFn: getAlbumList,
  });
  const popUp = useAppSelector(selectPopUp);
  const loginStatus = useAppSelector(selectLoginStatus);
  const dispatch = useAppDispatch();
  const [filter, setFilter] = React.useState<Filter>({
    attr: "createTime",
    order: 1,
  });
  React.useEffect(() => {
    const album_filter = localStorage.getItem("album_filter");
    if (album_filter) {
      setFilter(JSON.parse(album_filter));
    }
  }, []);
  const buttonsClickEvent: Record<
    string,
    React.MouseEventHandler<HTMLDivElement>
  > = {
    add: () => {
      if (!loginStatus) return;
      dispatch(switchPopUp("add"));
    },
    delete: () => {
      if (!loginStatus) return;
      dispatch(switchPopUp("delete"));
    },
    filter: () => {
      dispatch(switchPopUp("filter"));
    },
  };
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
        "album_filter",
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
        "album_filter",
        JSON.stringify({ ...filter, order: value })
      );
    },
  ];
  const cancelEvent: React.MouseEventHandler<HTMLDivElement> = () => {
    dispatch(switchPopUp(null));
  };
  const albumListFilter = (albumList: AlbumType[], filter: Filter) => {
    const { attr, order } = filter;
    return albumList.sort((a, b) => {
      if (attr === "quantity") {
        return (a[attr] - b[attr]) * order;
      }
      return String(a[attr]).localeCompare(String(b[attr])) * order;
    });
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
      <Box popUp={popUp}>
        <Header title="相册" hasBack={true} hasBackHome={true} />
        <Buttons>
          {getAlbumButtons(loginStatus).map(({ name, src }, index) => (
            <ButtonFC
              imgSrc={src}
              key={index}
              clickEvent={buttonsClickEvent[name]}
            />
          ))}
        </Buttons>
        {albumListFilter(albumList, {
          attr: filter.attr,
          order: filter.order,
        }).map(({ id, title, cover, quantity, privacy }) => (
          <AlbumFC
            key={id}
            title={title}
            src={cover}
            id={id}
            quantity={quantity}
            privacy={privacy}
          />
        ))}
      </Box>
      {popUp ? (
        <PopUp>
          {popUp === "add" ? (
            <AddFC albumList={albumList.map(({ title }) => title)} />
          ) : popUp === "delete" ? (
            <DeleteFC
              albumList={albumList.map(({ id, title, quantity }) => {
                return {
                  id: id,
                  title: title,
                  quantity: quantity,
                };
              })}
            />
          ) : popUp === "filter" ? (
            <FilterFC>
              <Title>排序方式</Title>
              <Selects>
                <Select
                  name="attr"
                  value={filter.attr}
                  onChange={selectEvent[0]}
                >
                  <Option value="title">名称</Option>
                  <Option value="createTime">创建日期</Option>
                  <Option value="quantity">照片数量</Option>
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
      ) : null}
    </>
  );
};
