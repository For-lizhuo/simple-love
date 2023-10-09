import * as React from "react";
import { PhotoFCProps } from "../../types/FCProps";
import { Box, Photo, Img } from "./style";
import { useAppDispatch } from "../../hooks";
import { setPictureInfo, switchPopUp } from "../../redux/features/photoSlice";
export const PhotoFC: React.FC<PhotoFCProps> = ({ photoSrc, photoId }) => {
  const dispatch = useAppDispatch();
  const BoxEvent: React.MouseEventHandler<HTMLDivElement> = () => {
    dispatch(switchPopUp("picture"));
    dispatch(setPictureInfo({ pictureSrc: photoSrc, pictureId: photoId }));
  };
  return (
    <Box onClick={BoxEvent}>
      <Photo>
        <Img src={photoSrc} />
      </Photo>
    </Box>
  );
};
