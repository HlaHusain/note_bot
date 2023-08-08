import * as React from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { CircularProgress, Divider, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { getFavNotes } from "./api";
import { useAuth } from "../../../contexts/AuthProvider.js";

import { Container } from "@mui/material";

import { PageHeader } from "../../../components/PageHeader";
import { useNavigate } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import { deleteCourseWithNotes } from "../../courses/list/course.api";
import { NotesList } from "../../../components/NotestList";

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

export const SavedNotesList = () => {
  const theme = useTheme();
  const classes = useStyles();

  const [courses, setCourses] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [showMore, setShowMore] = React.useState(false);
  const handleShowMoreClick = () => {
    setShowMore(true);
  };
  const [notes, setNotes] = useState([]);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { token, user } = useAuth();
  const settings = ["Delete"];
  const navigate = useNavigate();
  useEffect(() => {
    let fetchNotesList = async () => {
      setIsLoading(true);
      const notes = await getFavNotes(token, user);
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
    setNotes((notes) =>
      notes.map((note) => {
        if (note._id !== noteId) {
          return note;
        }

        return {
          ...note,
          isFavorite: !note.isFavorite,
        };
      })
    );
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <PageHeader
        title="My Favorite Notes"
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
          You don't have any saved notes
        </Box>
      )}
      <NotesList notes={notes} onFavorite={onFavorite} />
      <Divider sx={{ marginTop: 2 }} />
    </Container>
  );
};
