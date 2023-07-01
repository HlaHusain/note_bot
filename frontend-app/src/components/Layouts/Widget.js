import { Avatar, Box, Grid, Stack, Tooltip, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TitleIcon from "@mui/icons-material/Title";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
export const Widget = ({ arrayWidget, handle }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      p={2}
      m={2}
      sx={{
        borderRadius: "6.735px",
        border: "0.673px dashed #575757",
        height: "100%",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        justifyContent={"center"}
        alignContent={"center"}
      >
        {arrayWidget.map((widget,index) => (
          <Grid item xs={widget[index]}>
            
          </Grid>
        ))}
      </Stack>
    </Box>
  );
};
