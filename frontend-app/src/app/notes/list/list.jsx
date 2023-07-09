import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from "@mui/icons-material/Add";
import { Avatar, CircularProgress, Divider, useTheme } from "@mui/material";
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
  const theme = useTheme();

  const [showMore, setShowMore] = React.useState(false);
  const handleShowMoreClick = () => {
    setShowMore(true);
  };
  const [notes, setNotes] = useState([]);
  const { token, user } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    let fetchNotesList = async () => {
      setIsLoading(true)
      const notes = await getNotes(token, user);
      setNotes(notes);
      setIsLoading(false)
    };
    fetchNotesList();
  }, [token, user]);

  const [isLoading, setIsLoading] = useState(true);

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
            onClick: () => navigate("/courses"),
            disableElevation: true,
          },
        ]}
      />

      {isLoading && (
        <Box sx={{
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          p:4
        }}>
          <CircularProgress sx={{mr:2}} />
          please wait while loading notes
        </Box>
      )}

      {notes && (
        <Stack spacing={4}>
          {notes.map((note) => (
            <div>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#ED7D31", marginBottom: 0 }}
                  gutterBottom
                >
                  {note.course_title}
                </Typography>
                {
                  //Uncommented because the lack of implemnentation
                }
                {/* {!showMore && (
                    <Button
                      variant="text"
                      onClick={handleShowMoreClick} // make show more true
                      sx={{
                        color: "#ED7D31",
                        ":hover": {
                          background: "none",
                        },
                      }}
                      aria-label="Show More"
                    >
                      show More
                    </Button>
                  )} */}
              </Box>
              <Divider sx={{ marginTop: 0.5, marginBottom: 2 }} />
              {note && (
                <Grid container spacing={2}>
                  {note.notes.map((note) => (
                    <Grid item xs={12} sm={6} lg={4} key={note.id}>
                      <Card
                        onClick={() => navigate(`/notes/${note._id}`)}
                        sx={{
                          bgcolor: theme.palette.shadow.main,
                          borderRadius: 2,
                          cursor: "pointer",
                          ":hover": {
                            bgcolor: theme.palette.shadow.hover,
                          },
                          height: "100%",
                        }}
                      >
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
                              textAlign: "center",
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
                </Grid>
              )}
            </div>
          ))}
        </Stack>
      )}
      <Divider sx={{ marginTop: 4 }} />
    </Container>
  );
};
