import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const Header = ({ children, logo1 = true ,logo2=true }) => {
  return (
    <>
      <Box
        sx={{
          p:2.5,
          display:'flex',
          direction:'row',
          justifyContent:'space-between',
          alignItems:'center'
        }}
        component="header"
      >
  {logo1 && (
          <Link to="/">
             <Logo width={180} height={50} src="./logo.png" />
          </Link>
          )}
          {logo2 && (
          <Link to="/">
             <Logo width={130} height={25} src="./Ode_to_Code.png" />
          </Link>
          )}

      </Box>
    </>
  );
};
