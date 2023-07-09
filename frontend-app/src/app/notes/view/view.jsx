import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Container, Stack } from "@mui/material";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../../contexts/AuthProvider";

import { Section } from "../create/Section";
import { deleteNote, getWidgets } from "./api";
import { useNavigate, useParams } from "react-router-dom";
import { Delete as DeleteIcon } from "@mui/icons-material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const NoteView = ({}) => {
  const params = useParams();

  const [note, setNote] = React.useState(null);
  const [sections, setSections] = React.useState([]);
  const [widgets, setWidgets] = React.useState({});
  const { token, user } = useAuth();

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

  console.log(
    !!note &&
    note.user_id === user
  )
  return (
    <Container sx={{ flexGrow: 1, padding: 2 }}>
      <PageHeader
        title={note?.title}
        isEditable={false}
        disabled={!note}
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
    </Container>
  );
};
