import * as React from "react";
import { Box, Button, Img } from "./style";
import { ButtonFCProps } from "../../types/FCProps";
export const ButtonFC: React.FC<ButtonFCProps> = ({ imgSrc, clickEvent }) => {
  return (
    <Box onClick={clickEvent}>
      <Button>
        <Img src={imgSrc} />
      </Button>
    </Box>
  );
};
