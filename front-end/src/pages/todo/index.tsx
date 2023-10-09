/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Header } from "../../components/Header";
import { ProgressFC } from "../../components/Progress";
import { addTodo, getTodo, removeTodo, updateTodo } from "../../api/todo";
import { ResError, TodoType } from "../../types/resData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectPopUp, switchPopUp } from "../../redux/features/todoSlice";
import { ButtonFC } from "../../components/Button";
import { getTodoButtons } from "../../constants/buttons";
import {
  Buttons,
  PopUp,
  Box,
  Main,
  Choose,
  ChooseBox,
  Radio,
  Label,
  TodoBox,
  CompleteDate,
  Detail,
  DeleteButton,
  CompleteButton,
  CompleteBox,
  ButtonBox,
  Button,
  Title,
  CompleteTitle,
  CalendarBox,
  AddBox,
  AddInput,
  AddFCRadioBox,
  AddFCLabel,
  AddFCRadio,
  FilterFC,
  Selects,
  Select,
  Option,
  LotteryBox,
  CloseBtn,
  Lottery,
  TopBox,
  BottomBox,
  ArrowToRight,
  ArrowToLeft,
  Ul,
  MiddleBox,
  Li,
  StartOrStopBtn,
} from "./style";
import { TodoCompleteFCProps, TodoLotteryProps } from "../../types/FCProps";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DateFormat } from "../../utils/date";
import { selectLoginStatus, selectToken } from "../../redux/features/authSlice";
import { Random } from "random-js";

export const AddFC: React.FC = () => {
  const [input, setInput] = React.useState<string>("");
  const [radio, setRadio] = React.useState<boolean>(false);
  const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addTodo,
    onError(error) {
      const { status, statusText } = (error as ResError).response;
      throw new Response("", {
        status: status,
        statusText: statusText,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      setInput("");
      setRadio(false);
      setDate(dayjs(null));
      dispatch(switchPopUp(null));
    },
  });
  const cancelEvent: React.MouseEventHandler<HTMLDivElement> = () => {
    setInput("");
    setDate(null);
    setRadio(false);
    dispatch(switchPopUp(null));
  };
  const submitEvent: React.MouseEventHandler<HTMLDivElement> = async () => {
    if (input === "" || (radio && date === null)) return;
    else if (radio && date) {
      mutation.mutate({
        detail: input,
        complete: radio,
        completeDate: DateFormat(date.toDate()),
        token,
      });
    } else {
      mutation.mutate({
        detail: input,
        complete: radio,
        token,
      });
    }
  };
  const inputEvent: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const input = e.target.value;
    setInput(input);
  };
  const radioEvent: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setRadio(e.target.value === "complete_true" ? true : false);
  };
  return (
    <AddBox>
      <Title>添加todo</Title>
      <AddInput
        type="text"
        placeholder="一起..."
        onChange={inputEvent}
        maxLength={20}
        value={input}
      />
      <AddFCRadioBox>
        <AddFCRadio
          type="radio"
          id="complete_false"
          value="complete_false"
          name="complete"
          onChange={radioEvent}
          checked={!radio}
        />
        <AddFCLabel htmlFor="complete_false">待完成</AddFCLabel>
        <AddFCRadio
          type="radio"
          id="complete_true"
          value="complete_true"
          name="complete"
          onChange={radioEvent}
          checked={radio}
        />
        <AddFCLabel htmlFor="complete_true">已完成</AddFCLabel>
      </AddFCRadioBox>
      {radio ? (
        <CalendarBox>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(date)}
              onChange={(date) => {
                setDate(dayjs(date));
              }}
              label="完 成 日 期"
            />
          </LocalizationProvider>
        </CalendarBox>
      ) : null}
      <ButtonBox>
        <Button onClick={cancelEvent}>取消</Button>
        <Button
          onClick={submitEvent}
          isAble={input !== "" && (radio === false || (radio && date !== null))}
        >
          确定
        </Button>
      </ButtonBox>
    </AddBox>
  );
};

export const CompleteFC: React.FC<TodoCompleteFCProps> = ({ id, detail }) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const token = useAppSelector(selectToken);
  const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);
  const mutation = useMutation({
    mutationFn: updateTodo,
    onError(error) {
      const { status, statusText } = (error as ResError).response;
      throw new Response("", {
        status: status,
        statusText: statusText,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      dispatch(switchPopUp(null));
    },
  });
  const backEvent: React.MouseEventHandler<HTMLDivElement> = () => {
    dispatch(switchPopUp(null));
  };
  const submitEvent: React.MouseEventHandler<HTMLDivElement> = () => {
    if (date === null) return;
    mutation.mutate({ id, completeDate: DateFormat(date.toDate()), token });
  };
  return (
    <CompleteBox>
      <CompleteTitle>{detail}</CompleteTitle>
      <CalendarBox>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dayjs(date)}
            onChange={(date) => {
              setDate(dayjs(date));
            }}
            label="完成日期"
          />
        </LocalizationProvider>
      </CalendarBox>
      <ButtonBox>
        <Button onClick={backEvent}>返回</Button>
        <Button onClick={submitEvent} isAble={date !== null}>
          确认
        </Button>
      </ButtonBox>
    </CompleteBox>
  );
};

export const LotteryFC: React.FC<TodoLotteryProps> = ({ todoList }) => {
  const dispatch = useAppDispatch();
  const [todoShow, setTodoShow] = React.useState<string[]>(todoList);
  const btnEvent: React.MouseEventHandler<HTMLDivElement> = () => {
    const random = new Random(); // uses the nativeMath engine
    const value = random.integer(3, 8);
    const id = setInterval(() => {
      setTodoShow((pre) => {
        const arr = [...pre];
        arr.push(arr.shift() as string);
        return arr;
      });
    }, 200);
    setTimeout(() => {
      clearInterval(id);
    }, 1000 * value);
  };
  return (
    <LotteryBox>
      <Lottery>
        <TopBox />
        <MiddleBox />
        <BottomBox />
        <Ul>
          {todoShow.slice(0, 5).map((value, index) => {
            return <Li key={index}>{value}</Li>;
          })}
        </Ul>
        <ArrowToRight />
        <ArrowToLeft />
      </Lottery>
      <StartOrStopBtn onClick={btnEvent}>{`抽一个!`}</StartOrStopBtn>
      <CloseBtn
        onClick={() => {
          dispatch(switchPopUp(null));
        }}
      />
    </LotteryBox>
  );
};

type RadioType = "all" | "complete" | "complete_none";
type Filter = {
  attr: "createTime" | "completeDate";
  order: 1 | -1;
};

export const Todo: React.FC = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const popUp = useAppSelector(selectPopUp);
  const loginStatus = useAppSelector(selectLoginStatus);
  const [radio, setRadio] = React.useState<RadioType>("all");
  const [completeId, setCompleteId] = React.useState<number>(-1);
  const [completeDetail, setCompleteDetail] = React.useState<string>("");
  const [filter, setFilter] = React.useState<Filter>({
    attr: "createTime",
    order: -1,
  });
  React.useEffect(() => {
    const album_filter = localStorage.getItem("todo_filter");
    const todo_radio = localStorage.getItem("todo_radio");
    if (todo_radio) {
      setRadio(todo_radio as RadioType);
    }
    if (album_filter) {
      setFilter(JSON.parse(album_filter));
    }
  }, []);
  const radioEvent: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setRadio(value as RadioType);
    localStorage.setItem("todo_radio", value);
  };
  const buttonsClickEvent: Record<
    string,
    React.MouseEventHandler<HTMLDivElement>
  > = {
    add: () => {
      if (!loginStatus) return;
      dispatch(switchPopUp("add"));
    },
    filter: () => {
      dispatch(switchPopUp("filter"));
    },
    lottery: () => {
      dispatch(switchPopUp("lottery"));
    },
  };
  const deleteEvent: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { id } = e.target as any;
    mutation.mutate(id);
  };
  const cancelEvent: React.MouseEventHandler<HTMLDivElement> = () => {
    dispatch(switchPopUp(null));
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
        "todo_filter",
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
        "todo_filter",
        JSON.stringify({ ...filter, order: value })
      );
    },
  ];
  const todoFilter = (
    todo: TodoType[],
    condition: RadioType,
    filter: Filter
  ) => {
    let res = new Array<TodoType>();
    const { attr, order } = filter;
    if (condition === "all") res = [...todo];
    else if (condition === "complete") {
      res = [...todo.filter((value) => value.complete === true)];
    } else {
      res = [...todo.filter((value) => value.complete === false)];
    }
    return res.sort((a, b) => {
      return String(a[attr]).localeCompare(String(b[attr])) * order;
    });
  };
  const mutation = useMutation({
    mutationFn: removeTodo,
    onError(error) {
      const { status, statusText } = (error as ResError).response;
      throw new Response("", {
        status: status,
        statusText: statusText,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });
  const {
    isLoading,
    isFetching,
    error,
    data: todo,
  } = useQuery<TodoType[], ResError>({
    queryKey: ["todo"],
    queryFn: getTodo,
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
        <Header title="todo" hasBack={true} hasBackHome={true}></Header>
        <Buttons>
          {getTodoButtons(loginStatus).map(({ name, src }, index) => (
            <ButtonFC
              imgSrc={src}
              key={index}
              clickEvent={buttonsClickEvent[name]}
            />
          ))}
        </Buttons>
        <Main>
          <ChooseBox>
            <Choose>
              <Radio
                type="radio"
                id="all"
                value="all"
                name="setting"
                checked={radio === "all"}
                onChange={radioEvent}
              />
              <Label>全部</Label>
            </Choose>
            <Choose>
              <Radio
                type="radio"
                id="complete_none"
                value="complete_none"
                name="setting"
                checked={radio === "complete_none"}
                onChange={radioEvent}
              />
              <Label>待完成</Label>
            </Choose>
            <Choose>
              <Radio
                type="radio"
                id="complete"
                value="complete"
                name="setting"
                checked={radio === "complete"}
                onChange={radioEvent}
              />
              <Label>已完成</Label>
            </Choose>
          </ChooseBox>
          {todoFilter(todo, radio, filter).map(
            ({ id, detail, complete, completeDate }) => {
              return (
                <TodoBox key={id}>
                  <Detail>{detail}</Detail>
                  <CompleteDate complete={complete}>
                    {complete ? `完成于${completeDate}` : `待完成`}
                  </CompleteDate>
                  {loginStatus ? (
                    <DeleteButton onClick={deleteEvent} id={`${id}`} />
                  ) : null}
                  <CompleteButton
                    complete={complete}
                    onClick={() => {
                      if (complete || !loginStatus) return;
                      setCompleteId(id);
                      setCompleteDetail(detail);
                      dispatch(switchPopUp("complete"));
                    }}
                  />
                </TodoBox>
              );
            }
          )}
        </Main>
      </Box>
      <PopUp popUp={popUp}>
        {popUp === "add" ? (
          <AddFC />
        ) : popUp === "complete" ? (
          <CompleteFC detail={completeDetail} id={completeId} />
        ) : popUp === "lottery" ? (
          <LotteryFC
            todoList={todo
              .filter((item) => item.complete === false)
              .map((item) => item.detail)}
          />
        ) : popUp === "filter" ? (
          <FilterFC>
            <Title>排序方式</Title>
            <Selects>
              <Select name="attr" value={filter.attr} onChange={selectEvent[0]}>
                <Option value="createTime">创建日期</Option>
                <Option value="completeDate">完成日期</Option>
              </Select>
              <Select
                name="order"
                value={filter.order}
                onChange={selectEvent[1]}
              >
                <Option value={-1}>递减</Option>
                <Option value={1}>递增</Option>
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
