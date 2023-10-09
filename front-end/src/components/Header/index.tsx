import * as React from "react";
import { HeaderFCProps } from "../../types/FCProps";
import { Back, Box, BackHome, Title, Img } from "./style";
import { useNavigate } from "react-router-dom";
export const Header: React.FC<HeaderFCProps> = ({
  title,
  hasBack = false,
  hasBackHome,
}) => {
  const navigate = useNavigate();

  const back: React.MouseEventHandler<HTMLImageElement> = () => {
    navigate(-1);
  };

  const backHome: React.MouseEventHandler<HTMLImageElement> = () => {
    navigate("/", { replace: true });
  };

  return (
    <Box>
      <Back set={hasBack}>
        <Img src="/src/resources/back.png" alt="返回" onClick={back} />
      </Back>
      <Title>{title}</Title>
      <BackHome set={hasBackHome}>
        <Img src="/src/resources/backHome.png" alt="主页" onClick={backHome} />
      </BackHome>
    </Box>
  );
};
