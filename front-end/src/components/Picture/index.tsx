import * as React from "react";
import { Box, Buttons, Img } from "./style";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectPictureInfo,
  setPictureInfo,
  switchPopUp,
} from "../../redux/features/photoSlice";
import { getPictureButtons } from "../../constants/buttons";
import { ButtonFC } from "../Button";
import { DateTimeFormat } from "../../utils/date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removePhotos } from "../../api/photo";
import { ResError } from "../../types/resData";
import { selectLoginStatus, selectToken } from "../../redux/features/authSlice";
export const PictureFC: React.FC = () => {
  const { pictureSrc, pictureId } = useAppSelector(selectPictureInfo);
  const loginStatus = useAppSelector(selectLoginStatus);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removePhotos,
    onError(error: ResError) {
      const { status, statusText } = (error as ResError).response;
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
  const buttonsClickEvent: Record<
    string,
    React.MouseEventHandler<HTMLDivElement>
  > = {
    close: () => {
      dispatch(switchPopUp(null));
      dispatch(
        setPictureInfo({
          pictureSrc: "",
          pictureId: 0,
        })
      );
    },
    download: () => {
      const link = document.createElement("a");
      link.setAttribute("href", pictureSrc);
      link.setAttribute("download", DateTimeFormat(new Date()) + ".png");
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    delete: () => {
      if (!loginStatus) return;
      mutation.mutate({ photoIdList: [pictureId], token });
    },
  };

  return (
    <Box>
      <Img src={pictureSrc} />
      <Buttons>
        {getPictureButtons(loginStatus).map(({ name, src }, index) => (
          <ButtonFC
            imgSrc={src}
            key={index}
            clickEvent={buttonsClickEvent[name]}
          />
        ))}
      </Buttons>
    </Box>
  );
};
