import React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Avatar, Box, Typography } from "@mui/material";
import { Rating } from "@mui/material";
import { styled } from "@mui/system";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TitleIcon from "@mui/icons-material/Title";
import VideoIcon from "@mui/icons-material/VideoLibrary";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { PHeader } from "../../../components/PHeader";
import { MenuComponent } from "../../../components/Menu";

const notes = [
  {
    id: 1,
    title: "Note 1",
    content: "Lorem ipsum dolor sit amet",
    rating: 4,
    user: {
      name: "Yusra",
    },
  },
  {
    id: 2,
    title: "Note 2",
    content: "Consectetur adipiscing elit",
    rating: 3,
    user: {
      name: "Hla",
    },
  },
  {
    id: 3,
    title: "Note 3",
    content: "Pellentesque ac ligula",
    rating: 5,
    user: {
      name: "Hadil",
    },
  },
  {
    id: 4,
    title: "Note 4",
    content: "Mauris aliquet rhoncus est",
    rating: 2,
    user: {
      name: "Hadeel",
    },
  },
  {
    id: 5,
    title: "Note 5",
    content: "Nullam congue libero",
    rating: 1,
    user: {
      name: "Yusra",
    },
  },
  // Add more notes as needed
];

const useStyles = styled(Card)(({ theme }) => ({
  backgroundColor: "#E8E8E8",
  borderRadius: 2,
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#F0F0F0",
    cursor: "pointer",
  },
}));

export const SearchByCourse = () => {
  const navigate = useNavigate();

  const handleCardClick = (note) => {
    // Handle card click event and navigate to NoteView page
    navigate(`/note/${note.id}`);
  };

  return (
    <div>
      <MenuComponent />
      <PHeader title="Advanced Web Tech" />
      <Grid container spacing={2} sx={{ p: 2 }}>
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{ bgcolor: "#E8E8E8", borderRadius: 2 }}
               component={useStyles}
              onClick={() => handleCardClick(note)}
            >
              <CardHeader
              // action
              />
              <CardContent
                sx={{
                  paddingLeft: 2,
                  paddingRight: 2,
                  paddingBottom: 4,
                  paddingTop: 4,
                  color: "#4662A6",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 1,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ fontSize: 14, color: "gray", marginRight: 1 }}
                  >
                    {note.user.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{
                        bgcolor: "#ED7D31",
                        width: 25,
                        height: 25,
                        marginRight: 1,
                      }}
                    >
                      <PictureAsPdfIcon sx={{ fontSize: 15 }} />
                    </Avatar>
                    <Avatar
                      sx={{
                        bgcolor: "#ED7D31",
                        width: 25,
                        height: 25,
                        marginRight: 1,
                      }}
                    >
                      <TitleIcon sx={{ fontSize: 15 }} />
                    </Avatar>
                    <Avatar sx={{ bgcolor: "#ED7D31", width: 25, height: 25 }}>
                      <VideoIcon sx={{ fontSize: 15 }} />
                    </Avatar>
                  </Box>
                </Box>
                <Typography
                  variant="h6"
                  fontSize={16}
                  fontWeight={500}
                  sx={{
                    marginBottom: 4,
                    marginTop: 4,
                    textAlign: "center",
                    fontSize: 32,
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                  }}
                >
                  {note.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      value={note.rating}
                      readOnly
                      sx={{ marginRight: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {note.rating}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions disableSpacing>{/* ... */}</CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* ... */}
    </div>
  );
};