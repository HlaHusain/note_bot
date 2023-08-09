import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import AddIcon from "@mui/icons-material/Add";
import { CircularProgress, Divider, useTheme } from "@mui/material";

import { useState, useEffect } from "react";
import { getNotes } from "./api";
import { useAuth } from "../../../contexts/AuthProvider.js";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import ClearIcon from "@mui/icons-material/Clear";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Container, Typography, IconButton } from "@mui/material";

import { NotesList as NotesListComponent } from "../../../components/NotestList";

import { PageHeader } from "../../../components/PageHeader";
import { useNavigate } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import { deleteCourseWithNotes } from "../../courses/list/course.api";

const useStyles = makeStyles({
  underline: {
    "& input": {
      fontSize: "24px",
    },
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
});

export const NotesList = () => {
  const theme = useTheme();
  const classes = useStyles();

  const [courses, setCourses] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [notes, setNotes] = useState([]);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { token, user } = useAuth();
  const settings = ["Delete"];
  const navigate = useNavigate();
  useEffect(() => {
    let fetchNotesList = async () => {
      setIsLoading(true);
      const notes = await getNotes(token, user);

      setNotes(notes);
      setIsLoading(false);
    };
    fetchNotesList();

    setRefresh(false);
  }, [token, user, refresh]);

  const [isLoading, setIsLoading] = useState(true);

  const handleOpenMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElUser(null);
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourseWithNotes(courseId, token);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );
      setRefresh(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onFavorite = async (noteId) => {
    setNotes((courses) =>
      courses.map((course) => ({
        ...course,
        notes: course.notes.map((note) => {
          if (note._id !== noteId) {
            return note;
          }

          return {
            ...note,
            isFavorite: !note.isFavorite,
          };
        }),
      }))
    );
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <PageHeader
        title="My Notes"
        isEditable={false}
        variant={"standard"}
        InputProps={{ classes }}
        size="large"
        actions={[
          {
            label: "Add Note",
            startIcon: <AddIcon />,
            onClick: () => navigate("/notes/create"),
            color: "primary",
          },
          // {
          //   label: "Add Course",
          //   startIcon: <AddIcon />,
          //   onClick: () => navigate("/courses"),
          //   disableElevation: true,
          // },
        ]}
      />

      {isLoading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          }}
        >
          <CircularProgress sx={{ mr: 2 }} />
          please wait while loading notes
        </Box>
      )}

      {!isLoading && notes.length === 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          }}
        >
          You don't have any notes yet.
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
                  <Typography
                    sx={{ margin: 1, fontSize: "12px", color: "#969696" }}
                    gutterBottom
                  >
                    ( {note.notes.length} )
                  </Typography>
                </Box>

                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenMenu}>
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleDeleteCourse(note.course_id)}
                    >
                      {setting === "Delete" && (
                        <>
                          <ClearIcon
                            fontSize="12"
                            sx={{
                              marginRight: 1,
                              opacity: 0.7,
                            }}
                          />
                          Delete this course
                        </>
                      )}
                    </MenuItem>
                  ))}
                </Menu>
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
              <Divider sx={{ marginTop: 0.5, marginBottom: 1 }} />
              <NotesListComponent notes={note.notes} onFavorite={onFavorite} />
            </div>
          ))}
        </Stack>
      )}
      <Divider sx={{ marginTop: 2 }} />
    </Container>
  );
};
