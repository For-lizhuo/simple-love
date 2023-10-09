import * as React from "react";
import {
  Box,
  Line,
  Photo,
  PhotoBox,
  Quantity,
  Title,
  TitleBox,
  Img,
  Empty,
  Forbid,
} from "./style";
import { AlbumFCProps } from "../../types/FCProps";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { selectLoginStatus } from "../../redux/features/authSlice";
export const AlbumFC: React.FC<AlbumFCProps> = ({
  title,
  src,
  id,
  quantity,
  privacy,
}) => {
  const navigate = useNavigate();
  const loginStatus = useAppSelector(selectLoginStatus);
  const clickBox: React.MouseEventHandler<HTMLDivElement> = () => {
    if (!loginStatus && privacy) return;
    navigate(`/album/${id}`);
  };
  return (
    <Box>
      <TitleBox>
        <Title>{title}</Title>
      </TitleBox>
      <Line />
      <PhotoBox onClick={clickBox}>
        {!loginStatus && privacy ? (
          <Forbid />
        ) : (
          <Photo>
            {src === null ? <Empty>空空如也</Empty> : <Img src={src} />}
            {quantity > 0 ? <Quantity>{quantity}</Quantity> : null}
          </Photo>
        )}
      </PhotoBox>
    </Box>
  );
};
