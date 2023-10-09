import * as React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { BackHome, Box, Info, Title } from "./style";

type Error = {
  status: number;
  statusText?: string;
  message?: string;
};

export const ErrorPage: React.FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const backHome:React.MouseEventHandler<HTMLDivElement> = ()=>{
    navigate('/home')
  }
  return (
    <Box>
      <Title>页面走丢了 T_T</Title>
      <Info>{`Error Code : ${(error as Error).status||'500'}`}</Info>
      <Info>{`${(error as Error).statusText||'服务器内部出错了！'}`}</Info>
      <BackHome onClick={backHome}>点击返回主页</BackHome>
    </Box>
  );
};
