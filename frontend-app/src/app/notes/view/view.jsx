import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Container, Stack } from "@mui/material";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../../contexts/AuthProvider";

import { Section } from "../create/Section";
import { deleteNote, getWidgets, updateNoteRating } from "./api";
import { useNavigate, useParams } from "react-router-dom";
import { Delete as DeleteIcon } from "@mui/icons-material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@mui/styles";
import { StarRating } from "../../../components/StarRating";
import Paper from "@mui/material/Paper";

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

export const NoteView = ({}) => {
  const params = useParams();

  const [note, setNote] = React.useState(null);
  const [sections, setSections] = React.useState([]);
  const [widgets, setWidgets] = React.useState({});
  const { token, user } = useAuth();
  const [userRating, setUserRating] = useState({});
  const classes = useStyles();

  useEffect(() => {
    getWidgets(token, params.id).then((res) => {
      const widgets = {};

      res.widgets.forEach((widget) => {
        if (!widgets[widget.section_id]) {
          widgets[widget.section_id] = {};
        }

        widgets[widget.section_id][widget.layout_index] = {
          ...widget,
          data: widget.data || {},
        };
      });

      setNote(res.note);
      setSections(
        res.sections.map((section) => ({
          ...section,
          layout: section.layout_field,
        }))
      );
      setWidgets(widgets);
    });
  }, [params.id, token]);
  const navigate = useNavigate();
  const [isDeleteActive, setDeleteActive] = React.useState(false);

  const [isDeleting, setIsDeleting] = React.useState(false);

  const onDelete = async () => {
    setIsDeleting(true);
    await deleteNote(note._id, token);
    navigate(`/notes`);
  };

  const handleRatingChange = async (newRating, noteId) => {
    try {
      console.log("Updating rating for note:", noteId);
      console.log("New rating:", newRating);

      // Update the user's rating in the state
      setUserRating((prevUserRating) => ({
        ...prevUserRating,
        [noteId]: newRating,
      }));

      // Update the user's rating on the server
      await updateNoteRating(noteId, user, newRating, token);

      console.log("User rating updated successfully");

      // Rest of your code...
    } catch (error) {
      console.error("Error saving user rating:", error);
    }
  };
  console.log("note.user_id:", note ? note.user_id : "null");
  console.log("user_id:", user ? user : "null");

  console.log(!!note && note.user_id === user);
  return (
    <Container sx={{ flexGrow: 1, padding: 2 }}>
      <PageHeader
        title={note?.title}
        isEditable={false}
        disabled={!note}
        variant={"standard"}
        InputProps={{ classes }}
        actions={
          !!note &&
          note.user_id === user && [
            {
              label: "Edit",
              startIcon: <EditIcon />,
              onClick: () => navigate(`/notes/${note._id}/edit`),
            },
            {
              label: "Delete",
              color: "error",
              startIcon: <DeleteIcon />,
              onClick: () => setDeleteActive(true),
            },
          ]
        }
      />
      {sections.map((section, index) => (
        <>
          {index > 0 && <Box sx={{ height: 16, width: "100%" }} />}
          <Section
            key={section._id}
            section={section}
            widgets={widgets[section._id] || {}}
            viewMode={true}
          />
        </>
      ))}

      <Dialog open={isDeleteActive} onClose={() => setDeleteActive(false)}>
        <DialogTitle>{"Delete this note"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting this note is permanent and cannot be undone. Are you sure
            you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setDeleteActive(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onDelete}>
            Yes Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Position the average rating block */}
      {!!note && (
        <Box
          style={{
            position: "fixed",
            right: 24,
            bottom: 24,
            padding: 2,
            margin: 2,
          }}
        >
          <Paper elevation={3} sx={{ padding: 1, margin: 1 }}>
            <p>Your Rating:</p>
            <StarRating
              value={parseFloat(userRating[note._id]) || 0}
              onRatingChange={(newRating) =>
                handleRatingChange(newRating, note._id)
              }
              readOnly={false}
            />
          </Paper>
        </Box>
      )}
    </Container>
  );
};
