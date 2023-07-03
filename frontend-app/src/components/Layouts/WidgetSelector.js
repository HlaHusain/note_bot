import { Avatar, Box, Stack, Tooltip, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TitleIcon from "@mui/icons-material/Title";
import YouTubeIcon from "@mui/icons-material/YouTube";
export const WidgetSelector = ({ handle ,index }) => {
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
      <Stack justifyContent={"center"} alignContent={"center"}>
        <Typography sx={{ fontSize: 10, padding: 2 }}>
          CHOOSE A WIDGET
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Avatar
          sx={{
            bgcolor: "#4472C4",
            ":hover": {
              bgcolor: "#bdbdbd",
            },
          }}
          onClick={() => handle("TEXT" , index)}
        >
          <TitleIcon
            sx={{
              fontSize: 15,
              ":hover": {
                bgcolor: "#bdbdbd",
              },
            }}
          />
        </Avatar>
        <Avatar
          onClick={() => handle("PDF", index)}
          sx={{
            bgcolor: "#ED7D31",
            ":hover": {
              bgcolor: "#bdbdbd",
            },
          }}
        >
          <PictureAsPdfIcon sx={{ fontSize: 15 }} />
        </Avatar>
        <Avatar
          onClick={() => handle("YOUTUBE" , index)}
          sx={{
            bgcolor: "red",
            ":hover": {
              bgcolor: "#bdbdbd",
            },
          }}
        >
          <YouTubeIcon sx={{ fontSize: 15 }} />
        </Avatar>
      </Stack>
    </Box>
  );
};
