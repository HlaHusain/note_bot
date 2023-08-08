import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Fab,
  Stack,
  styled,
  useTheme,
} from "@mui/material";
import { PageHeader } from "../../../components/PageHeader";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import { useState } from "react";

import { useAuth } from "../../../contexts/AuthProvider";
import { AddCourseDialog } from "../../../components/AddCourseDialog";
import { useToggle } from "../../../app/hooks/useToggle";
import { Section } from "./Section";
import { createNote, getCourses } from "./api";
import { useNavigate } from "react-router-dom";
import { useNoteWidgets } from "../hooks/useNoteWidgets";
import { Chatbot } from "./../../chatbot";

export const CreateNote = () => {
  const {
    sections,
    widgets,
    onSectionChange,
    onWidgetSelect,
    onWidgetUpdate,
    hasWidgets,
    addSection,
    onDelete,
    onAddAfter,
    onDuplicate,
  } = useNoteWidgets();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const { token, user, saveUser, logout, isAuthorized } = useAuth();

  const [title, setTitle] = React.useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const toggleChat = () => {
    setOpen(!open);
  };

  const {
    isActive: isAddCourseActive,
    open: openAddCourse,
    close: closeAddCourse,
  } = useToggle();

  const fetchCourses = React.useCallback(async () => {
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
  }, [token, user]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const onSubmit = async (data = {}) => {
    if (!title) {
      alert("Title is empty");
      return;
    }
    const res = await createNote(
      token,
      title,
      data.courseId || course,
      user,
      sections,
      widgets
    );

    console.log("RES", res);
    navigate(`/notes/${res.note._id}`);
  };

  return (
    <Container sx={{ flexGrow: 1, padding: 6 }}>
      <PageHeader
        // title={title}
        label={"Add Note Title"}
        onChange={(title) => setTitle(title)}
        isEditable={true}
        sx={{ width: "100%" }}
        variant={"outlined"}
        actions={[
          {
            label: "download as pdf",
            startIcon: <FileDownloadIcon />,
            onClick: () => {},
            color: "primary",
            variant: "outlined",
            disabled: true,
          },
          {
            label: "Save",
            startIcon: <SaveIcon />,
            onClick: openAddCourse,
            disableElevation: true,
            disabled: !hasWidgets,
          },
          // {
          //   label: "Add to course",
          //   startIcon: <SaveIcon />,
          //   onClick: openAddCourse,
          //   disableElevation: true,
          //   disabled: !hasWidgets,
          // },
        ]}
      />
      {sections.map((section, index) => (
        <>
          {index > 0 && <Box sx={{ height: 16, width: "100%" }} />}
          <Section
            key={section.id}
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
          // marginTop: 2,
          // padding: 5,
          height: 150,
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
          <AddIcon />
        </Button>
      </Stack>

      <AddCourseDialog
        onClose={closeAddCourse}
        isOpen={isAddCourseActive}
        courses={courses}
        course={course}
        onSave={onSubmit}
        onChange={(course) => {
          setCourse(course);
          fetchCourses();
        }}
      />

      {open && <Chatbot />}

      <Fab
        sx={{
          position: "fixed",
          right: 24,
          bottom: 24,
        }}
        size="medium"
        aria-label={"label"}
        color={""}
      >
        <Avatar
          sx={{ width: 60, height: 60 }}
          src={"/chatBot.png"}
          onClick={toggleChat}
        />
      </Fab>
    </Container>
  );
};
