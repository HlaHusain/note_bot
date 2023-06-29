import * as React from "react";
import { Style } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from "@mui/icons-material/Add";
import { Avatar, Divider } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TitleIcon from "@mui/icons-material/Title";
import { useState, useEffect } from "react";
import { getNotes } from "./api";
import { useAuth } from "../../../contexts/AuthProvider.js";

import {
  Container,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Rating,
} from "@mui/material";

export const NotesList = () => {
  const notes1 = [
    { id: 1, title: "Topic 1: Status", rating: 4 },
    { id: 2, title: "Note 2", rating: 3 },
    { id: 3, title: "Note 3", rating: 5 },
    { id: 4, title: "Note 4", rating: 6 },
    { id: 5, title: "Note 5", rating: 4 },
    { id: 6, title: "Note 6", rating: 3 },
    { id: 7, title: "Note 7", rating: 5 },
    { id: 8, title: "Note 8", rating: 6 },
  ];

  const notes2 = [
    { id: 9, title: "Topic 1 in ILE", rating: 4 },
    { id: 10, title: "Notes in AI Ethics", rating: 3 },
    { id: 11, title: "Notes in CTAT", rating: 5 },
    { id: 12, title: "Notes in FIAT", rating: 6 },
    { id: 13, title: "Note 5", rating: 4 },
    { id: 14, title: "Note 6", rating: 3 },
    { id: 15, title: "Note 7", rating: 5 },
    { id: 16, title: "Note 8", rating: 6 },
  ];
  const [showMore, setShowMore] = React.useState(false);
  const handleShowMoreClick = () => {
    setShowMore(true);
  };

  const visibleNotes1 = showMore ? notes1 : notes1.slice(0, 4);
  const visibleNotes2 = showMore ? notes2 : notes2.slice(0, 4);

  const [notes, setNotes] = useState([]);
  const { token, user, saveUser, logout, isAuthorized } = useAuth();

  useEffect(() => {
    console.log("hla", token, user);

    let notesList = async () => {
      const notes = await getNotes(token, user);
      setNotes(notes);
    };
    notesList();
  }, []);

  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ marginBottom: 2 }}
      >
        <Grid item>
          <Typography
            variant="h5"
            component="h1"
            sx={{ marginBottom: "0" }}
            gutterBottom
          >
            My Notes
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
            size="small"
            sx={{
              background: "#ED7D31",
              borderRadius: 1,
              color: "#FFFFFF",
              alignItems: "left",
              paddingX: 2,
              paddingY: 0.5,
              border: "0",
              marginLeft: 2,
              "&:hover": {
                color: "#fff",
                background: "#ed955a",
                border: "0",
              },
            }}
          >
            Add Note
          </Button>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
            size="small"
            sx={{
              background: "#ED7D31",
              borderRadius: 1,
              color: "#FFFFFF",
              alignItems: "left",
              paddingX: 2,
              paddingY: 0.5,
              border: "0",
              marginLeft: 2,
              "&:hover": {
                color: "#fff",
                background: "#ed955a",
                border: "0",
              },
            }}
          >
            Add Course
          </Button>
        </Grid>
      </Grid>
      <Divider
        component="div"
        role="presentation"
        sx={{
          marginBottom: 4,
          borderBottomWidth: "2px",
          borderBottomStyle: "solid",
          borderBottomColor: "#D9D9D9",
        }}
      />
      <Grid container spacing={2} justifyContent="center">
        <Grid item sx={{ maxWidth: 1400, width: "100%" }}>
          <Grid container sx={{ px: 2 }}>
            <Typography
              variant="h6"
              sx={{ color: "#ED7D31", marginBottom: 0 }}
              gutterBottom
            >
              Advance web Technologies
            </Typography>
          </Grid>
          <Grid container spacing={2} sx={{ p: 2 }}>
            {notes &&
              notes.map((note) => (
                <Grid item={true} xs={12} sm={6} md={4} key={note.id}>
                  <Card sx={{ bgcolor: "#E8E8E8", borderRadius: 2 }}>
                    <CardHeader
                      action={
                        <Box sx={{ display: "flex" }}>
                          <Avatar
                            sx={{
                              bgcolor: "#4472C4",
                              width: 25,
                              height: 25,
                              marginRight: 1,
                            }}
                          >
                            <TitleIcon sx={{ fontSize: 15 }} />
                          </Avatar>
                          <Avatar
                            sx={{ bgcolor: "#ED7D31", width: 25, height: 25 }}
                          >
                            <PictureAsPdfIcon sx={{ fontSize: 15 }} />
                          </Avatar>
                        </Box>
                      }
                    />
                    <CardContent sx={{ padding: 4, color: "#4662A6" }}>
                      <Typography
                        variant="h5"
                        fontSize={18}
                        fontWeight={550}
                        sx={{
                          wordBreak: "break-word",
                        }}
                        gutterBottom
                      >
                        {note.title}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Rating
                        value={note.rating}
                        readOnly
                        sx={{
                          color: "#323232", // Set the color of stars to black
                        }}
                      />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            {!showMore && (
              <Grid item xs={12} sm={6} md={4} display={"flex"}>
                <Button
                  variant="text"
                  onClick={handleShowMoreClick} // make show more true
                  sx={{ color: "#ED7D31", border: "none" }}
                  aria-label="Show More"
                >
                  show More
                </Button>
              </Grid>
            )}
          </Grid>
          <Divider
            component="div"
            role="presentation"
            sx={{
              marginBottom: 2,
              borderBottomWidth: "2px",
              borderBottomStyle: "solid",
              borderBottomColor: "#D9D9D9",
            }}
          />
        </Grid>

        <Grid item sx={{ maxWidth: 1400, width: "100%" }}>
          <Grid container sx={{ px: 2 }}>
            <Typography
              variant="h6"
              sx={{ color: "#ED7D31", marginBottom: 0 }}
              gutterBottom
            >
              Intelligent Learning Environments
            </Typography>
          </Grid>
          <Grid container spacing={2} sx={{ p: 2 }}>
            {visibleNotes2.map((note2) => (
              <Grid item={true} xs={12} sm={6} md={4} key={note2.id}>
                <Card sx={{ bgcolor: "#E8E8E8", borderRadius: 2 }}>
                  <CardHeader
                    action={
                      <Box sx={{ display: "flex" }}>
                        <Avatar
                          sx={{
                            bgcolor: "#4472C4",
                            width: 25,
                            height: 25,
                            marginRight: 1,
                          }}
                        >
                          <TitleIcon sx={{ fontSize: 15 }} />
                        </Avatar>
                        <Avatar
                          sx={{ bgcolor: "#ED7D31", width: 25, height: 25 }}
                        >
                          <PictureAsPdfIcon sx={{ fontSize: 15 }} />
                        </Avatar>
                      </Box>
                    }
                  />
                  <CardContent sx={{ padding: 4, color: "#4662A6" }}>
                    <Typography
                      variant="h5"
                      fontSize={18}
                      fontWeight={550}
                      sx={{
                        wordBreak: "break-word",
                      }}
                      gutterBottom
                    >
                      {note2.title}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Rating
                      value={note2.rating}
                      readOnly
                      sx={{
                        color: "#323232", // Set the color of stars to black
                      }}
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))}

            {!showMore && (
              <Grid item xs={12} sm={6} md={4} display={"flex"}>
                <Button
                  variant="text"
                  onClick={handleShowMoreClick} // make show more true
                  sx={{ color: "#ED7D31", border: "none" }}
                  aria-label="Show More"
                >
                  show More
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
