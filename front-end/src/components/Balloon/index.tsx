import { NavLink } from "react-router-dom";
import { Box, Body, Line } from "./style";
import { navLinkStyle } from "../../styles";
import { BalloonFCProps } from "../../types/FCProps";

export const Balloon: React.FC<BalloonFCProps> = ({ name, path }) => {
  return (
    <Box>
      <Body>
        <NavLink style={navLinkStyle} to={path}>{name}</NavLink>
      </Body>
      <Line />
    </Box>
  );
};