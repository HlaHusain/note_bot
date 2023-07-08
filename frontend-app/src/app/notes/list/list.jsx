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
import { PageHeader } from "../../../components/PageHeader";
import { useNavigate } from "react-router-dom";

export const NotesList = () => {
   
  const [showMore, setShowMore] = React.useState(false);
  const handleShowMoreClick = () => {
    setShowMore(true);
  }; 
  const [notes, setNotes] = useState([]);
  const { token, user, saveUser, logout, isAuthorized } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    let notesList = async () => {
      const notes = await getNotes(token, user);
      setNotes(notes);
    };
    notesList();
  }, []);

 
  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <PageHeader
        title="My Notes"
        isEditable={false}
        actions={[
          {
            label: "Add Note",
            startIcon: <AddIcon />,
            onClick: () => navigate("/notes/create"),
            color: "primary",
            variant: "outlined",
          },
          {
            label: "Add Course",
            startIcon: <AddIcon />,
            onClick: () => {},
            disableElevation: true,
          },
        ]}
      />

      <Grid container spacing={2} justifyContent="center">
        {notes &&
          notes.map((note) => (
            <Grid item sx={{ maxWidth: 1400, width: "100%" }}>
              <Grid container sx={{ px: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#ED7D31", marginBottom: 0 }}
                  gutterBottom
                >
                  {note.course_title}
                </Typography>
              </Grid>
              <Grid container spacing={2} sx={{ p: 2 }}>
                {note &&
                  note.notes.map((note) => (
                    <Grid item={true} xs={12} sm={6} md={4} key={note.id}>
                      <Card
                      onClick={() => navigate(`/notes/${note._id}`)}
                      sx={{ bgcolor: "#E8E8E8", borderRadius: 2, cursor:"pointer" }}>
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
                                sx={{
                                  bgcolor: "#ED7D31",
                                  width: 25,
                                  height: 25,
                                }}
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
          ))}
        {/* <Grid item sx={{ maxWidth: 1400, width: "100%" }}>
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
        </Grid> */}
      </Grid>
    </Container>
  );
};
