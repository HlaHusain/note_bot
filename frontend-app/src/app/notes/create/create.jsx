import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Container, Stack } from "@mui/material";
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
export const CreateNote = () => {
  /*
    widgets structure
    [sectionId]:
      [layoutIndex]: widget
  */
  const [widgets, setWidgets] = useState({});

  const { token, user, saveUser, logout, isAuthorized } = useAuth();

  const [sections, setSections] = useState([]);
  const [title, setTitle] = React.useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const onSectionChange = (id, data) => {
    setSections((sections) =>
      sections.map((section) => {
        if (id !== section.id) {
          return section;
        }

        return {
          ...section,
          ...data,
        };
      })
    );
  };
  const {
    isActive: isAddCourseActive,
    open: openAddCourse,
    close: closeAddCourse,
  } = useToggle();

  // const courses = [
  // { name: "AWT" },
  // { name: "ILE" },
  // { name: "Interactive systems" },
  // ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await getCourses(token, user);

        console.log("fetchedCourses", fetchedCourses);
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
  }, []);

  const onWidgetSelect = (type, layoutIndex, sectionId) => {
    setWidgets((widgets) => {
      let section = widgets[sectionId];
      if (!section) {
        section = {};
      }

      return {
        ...widgets,
        [sectionId]: {
          ...section,
          [layoutIndex]: {
            type,
            data: {},
          },
        },
      };
    });
  };

  const onSubmit = async () => {
    if (!title) {
      alert("Title is empty");
      return;
    }
    const res = await createNote(token, title, course, user, sections, widgets);

    console.log("RES", res);
    navigate(`/notes/${res.note._id}`);
  };

  const onWidgetUpdate = (widgetData, layoutIndex, sectionId) => {
    setWidgets((widgets) => ({
      ...widgets,
      [sectionId]: {
        ...widgets[sectionId],
        [layoutIndex]: {
          ...widgets[sectionId][layoutIndex],
          ...widgetData,
        },
      },
    }));
  };

  const hasWidgets = React.useMemo(
    () => Object.keys(widgets).length > 0,
    [widgets]
  );

  const hasCourse = !!course;

  return (
    <Container sx={{ flexGrow: 1, padding: 6 }}>
      <PageHeader
        title={title}
        label={"Add Note Title"}
        onChange={(title) => setTitle(title)}
        isEditable={true}
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
            label: "Save NOTE",
            startIcon: <SaveIcon />,
            onClick: () => {
              onSubmit();
            },
            disableElevation: true,
            disabled: !hasCourse || !hasWidgets,
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
      <Stack direction="column" spacing={6}>
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
            />
          </>
        ))}

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
            onClick={() =>
              setSections((sections) => [
                ...sections,
                {
                  layout: null,
                  id: Math.random(),
                },
              ])
            }
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
          onChange={(course) => setCourse(course)}
        />
      </Stack>
    </Container>
  );
};
