import * as React from "react";
import { Header } from "../../components/Header";
import { ButtonFC } from "../../components/Button";
import {
  Box,
  Buttons,
  TipsBox,
  Tips,
  TimeLine,
  Line,
  Detail,
  DateBox,
  DetailBox,
  Icon,
  AddBox,
  AddInput,
  Button,
  ButtonBox,
  DeleteBox,
  ListBox,
  Title,
  PopUp,
  CalendarBox,
  DeleteButton,
  DeleteDate,
  DeleteDetail,
  List,
} from "./style";
import { getAnniversaryButtons } from "../../constants/buttons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectPopUp,
  switchPopUp,
} from "../../redux/features/anniversarySlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addAnniversary,
  getAnniversary,
  removeAnniversary,
} from "../../api/anniversary";
import { AnniversaryType, ResError } from "../../types/resData";
import { DateFormat, getDaysBetweenDates } from "../../utils/date";
import { AnniversaryDeleteFCProps } from "../../types/FCProps";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { ProgressFC } from "../../components/Progress";
import { selectLoginStatus, selectToken } from "../../redux/features/authSlice";

export const AddFC: React.FC = () => {
  const [input, setInput] = React.useState<string>("");
  const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addAnniversary,
    onError(error) {
      const { status, statusText } = (error as ResError).response;
      throw new Response("", {
        status: status,
        statusText: statusText,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["anniversary"] });
      setInput("");
      setDate(dayjs(new Date()));
      dispatch(switchPopUp(null));
    },
  });
  const cancelEvent: React.MouseEventHandler<HTMLDivElement> = () => {
    setInput("");
    setDate(null);
    dispatch(switchPopUp(null));
  };
  const submitEvent: React.MouseEventHandler<HTMLDivElement> = async () => {
    if (input === "" || date === null) return;
    mutation.mutate({
      detail: input,
      date: DateFormat(date.toDate()),
      token
    });
  };
  const inputEvent: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const input = e.target.value;
    setInput(input);
  };
  return (
    <AddBox>
      <Title>添加纪念日</Title>
      <AddInput
        type="text"
        placeholder="输入纪念日信息"
        onChange={inputEvent}
        maxLength={12}
        value={input}
      ></AddInput>
      <CalendarBox>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dayjs(date)}
            onChange={(date) => {
              setDate(dayjs(date));
            }}
          />
        </LocalizationProvider>
      </CalendarBox>
      <ButtonBox>
        <Button onClick={cancelEvent}>取消</Button>
        <Button onClick={submitEvent} isAble={input !== "" && date !== null}>
          确定
        </Button>
      </ButtonBox>
    </AddBox>
  );
};

export const DeleteFC: React.FC<AnniversaryDeleteFCProps> = ({
  anniversary,
}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const token = useAppSelector(selectToken);
  const mutation = useMutation({
    mutationFn: removeAnniversary,
    onError(error) {
      const { status, statusText } = (error as ResError).response;
      throw new Response("", {
        status: status,
        statusText: statusText,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["anniversary"] });
      dispatch(switchPopUp(null));
    },
  });

  const backEvent: React.MouseEventHandler<HTMLDivElement> = () => {
    dispatch(switchPopUp(null));
  };
  const deleteEvent: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { id } = e.target as any;
    mutation.mutate({ id: Number(id), token });
  };
  return (
    <DeleteBox>
      <Title>删除纪念日</Title>
      <ListBox>
        {anniversary.map(({ id, detail, date }) => (
          <List key={id}>
            <DeleteDetail>{detail}</DeleteDetail>
            <DeleteDate>{date}</DeleteDate>
            <DeleteButton onClick={deleteEvent} id={`${id}`}></DeleteButton>
          </List>
        ))}
      </ListBox>
      <Button onClick={backEvent} isAble={true}>
        返回
      </Button>
    </DeleteBox>
  );
};

export const Anniversary: React.FC = () => {
  const dispatch = useAppDispatch();
  const popUp = useAppSelector(selectPopUp);
  const loginStatus = useAppSelector(selectLoginStatus);
  const [tips, setTips] = React.useState<string[]>([]);
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
  };
  const {
    isLoading,
    isFetching,
    error,
    data: anniversary,
  } = useQuery<AnniversaryType[], ResError>({
    queryKey: ["anniversary"],
    queryFn: getAnniversary,
  });

  React.useEffect(() => {
    if (!anniversary) return;
    const dateNow = DateFormat(new Date()).slice(5);
    const thisYear = new Date().getFullYear();
    let tips: string[] | null = null;
    for (const anni of anniversary) {
      if (dateNow.localeCompare(anni.date) === 0) {
        tips = ["今天是", anni.detail];
        break;
      } else if (dateNow.localeCompare(anni.date) < 0) {
        const gap = getDaysBetweenDates(
          new Date(),
          new Date(`${thisYear}-`.concat(anni.date))
        );
        tips = [`离${anni.detail}`, `还有${gap}天`];
        break;
      }
    }
    if (!tips) {
      const gap = getDaysBetweenDates(
        new Date(),
        new Date(`${thisYear + 1}-`.concat(anniversary[0].date))
      );
      tips = [`离${anniversary[0].detail}`, `还有${gap}天`];
    }
    setTips([...tips]);
  }, [anniversary]);

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
        <Header title="纪念日" hasBack={true} hasBackHome={true}></Header>
        <TipsBox>
          <Tips>{tips[0]}</Tips>
          <Tips>{tips[1]}</Tips>
        </TipsBox>
        <Buttons>
          {getAnniversaryButtons(loginStatus).map(({ name, src }, index) => (
            <ButtonFC
              imgSrc={src}
              key={index}
              clickEvent={buttonsClickEvent[name]}
            />
          ))}
        </Buttons>
        <TimeLine>
          {anniversary.map(({ date, detail }, index) => (
            <DetailBox key={index}>
              <Icon src="/src/resources/calendar.png" />
              <DateBox>{date}</DateBox>
              <Detail>{detail}</Detail>
            </DetailBox>
          ))}
          <Line length={anniversary.length * 20} />
        </TimeLine>
      </Box>
      <PopUp popUp={popUp}>
        {popUp === "add" ? (
          <AddFC />
        ) : popUp === "delete" ? (
          <DeleteFC anniversary={anniversary} />
        ) : null}
      </PopUp>
    </>
  );
};
