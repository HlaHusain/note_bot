import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Container, Stack, Grid, Divider } from "@mui/material";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Section } from "../create/Section";
import { getCourses, getWidgets, updateNote } from "./api";
import { useNavigate, useParams } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { useNoteWidgets } from "../hooks/useNoteWidgets";
import { AddCourseDialog } from "../../../components/AddCourseDialog";
import { useToggle } from "../../../app/hooks/useToggle";
import SaveIcon from "@mui/icons-material/Save";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const NoteEdit = ({}) => {
  const {
    sections,
    widgets,
    onSectionChange,
    onWidgetSelect,
    onWidgetUpdate,
    addSection,
    hasWidgets,
    replaceWidgets,
    onDelete,
    onAddAfter,
    onDuplicate,
  } = useNoteWidgets();

  const params = useParams();

  const [note, setNote] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState({});

  const [course, setCourse] = React.useState("");
  const [courses, setCourses] = React.useState([]);
  const { token, user } = useAuth();

  const {
    isActive: isAddCourseActive,
    open: openAddCourse,
    close: closeAddCourse,
  } = useToggle();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (note) {
      setCourse(note.course_id);
      console.log(note);
    }
  }, [note]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await getCourses(token, user);

        const courses = fetchedCourses.courses.map((course) => ({
          id: course._id,
          ...course,
        }));

        setCourses(courses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();

    getWidgets(token, params.id).then((res) => {
      if (!res.ok) {
        handleClick();
        setError(res.message);
      }
      const widgets = {};

      {
        res.widgets &&
          res.widgets.forEach((widget) => {
            if (!widgets[widget.section_id]) {
              widgets[widget.section_id] = {};
            }
            widgets[widget.section_id][widget.layout_index] = {
              ...widget,
              id: widget._id,
              data: widget.data || {},
            };
          });
      }

      // });
      {
        res.note && setNote(res.note);
      }
      {
        res.sections &&
          replaceWidgets(
            res.sections.map((section) => ({
              ...section,
              id: section._id,
              layout_field: section.layout_field,
            })),
            widgets
          );
      }
    });
  }, [params.id, token]);

  const navigate = useNavigate();

  const onUpdate = async () => {
    const res = await updateNote(
      token,
      note?.title,
      sections,
      widgets,
      note._id,
      course
    );
    if (!res.ok) {
      handleClick();
      setError(res.message);
    }
  };

  return (
    <Container sx={{ flexGrow: 1, padding: 4 }}>
      <PageHeader
        title={note?.title}
        isEditable={false}
        disabled={!note}
        actions={[
          {
            label: "Save",
            onClick: () => {
              console.log("widgets = ", widgets);
              onUpdate();
            },
          },
          {
            label: "Add to course",
            startIcon: <SaveIcon />,
            onClick: openAddCourse,
            disableElevation: true,
            disabled: !hasWidgets,
          },
        ]}
      />

      {sections.map((section, index) => (
        <>
          {index > 0 && <Box sx={{ height: 16, width: "100%" }} />}
          <Section
            key={section._id}
            section={section}
            onChange={onSectionChange}
            onWidgetSelect={onWidgetSelect}
            onWidgetUpdate={onWidgetUpdate}
            widgets={widgets[section.id] || {}}
            viewMode={false}
            onDelete={onDelete}
            onAddAfter={onAddAfter}
            onDuplicate={onDuplicate}
          />
        </>
      ))}

      {sections.length > 0 && (
        <Divider
          sx={{
            margin: 4,
          }}
        />
      )}

      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          height: 150,
          // marginY:2,
          borderRadius: "5px",
          border: "1px dashed #000",
          background: "#FFF",
        }}
      >
        <Button
          color="primary"
          onClick={addSection}
          variant="contained"
          sx={{
            borderRadius: "50%",
            width: 70,
            height: 70,
            ":hover": {
              background: "#ed955a",
              color: "#FFFFFF",
            },
          }}
        >
          <Add />
        </Button>
      </Stack>

      {courses && (
        <AddCourseDialog
          onClose={closeAddCourse}
          isOpen={isAddCourseActive}
          courses={courses}
          course={course}
          onChange={(course) => setCourse(course)}
        />
      )}

      {error && (
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </Container>
  );
};
