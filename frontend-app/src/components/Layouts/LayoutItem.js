import Grid from "@mui/material/Unstable_Grid2";
import {
  Button,
  ButtonBase,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#dfdede",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 0,
  boxShadow: 0,
  height: 60,
  color: theme.palette.text.secondary,
}));

export const LayoutItem = ({ columns ,handle }) => {

  return (
    <Grid
      container
      xs={12}
      spacing={1}
      sx={{
        margin: 1,
        width: 140,
        p:1,
        ":hover": {
            boxShadow: 1,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
            color: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
            borderRadius: 1,
          },
      }}
      onClick={()=>handle(columns)}
    >
      {columns.map((column, index) => {
        return (
          <Grid
            item
            xs={column}
          >
            <Item></Item>
          </Grid>
        );
      })}
    </Grid>
  );
};
