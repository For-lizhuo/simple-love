import * as React from "react";
import { Box, Avatar } from "./style";
import { AvatarFCProps } from "../../types/FCProps";
export const AvatarFC: React.FC<AvatarFCProps> = ({ avatarSrc }) => {
  return (
    <Box>
      <Avatar src={avatarSrc} />
    </Box>
  );
};
