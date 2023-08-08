import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Dialog,
  DialogTitle,
  Stack,
  formLabelClasses,
  Button,
  DialogActions,
  DialogContent,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Check } from "@mui/icons-material";
import { createCourse } from "../app/courses/create/api";
import { useAuth } from "../contexts/AuthProvider.js";

export function AddCourseDialog({
  courses,
  onChange,
  isOpen,
  onClose,
  course,
  onSave,
}) {
  const [openSelect, setOpenSelect] = React.useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const handleOpenSelect = () => setOpenSelect(formLabelClasses);
  const handleCloseSelect = () => setOpenSelect(false);

  const [createNew, setCreateNew] = useState(false);
  const { token, user } = useAuth();
  const [selectedCourseId, setSelectedCourseId] = useState();

  useEffect(() => {
    if (!createNew) {
      setCourseTitle("");
    }
  }, [createNew]);

  const assignCourse = async (e) => {
    let courseId = selectedCourseId;
    if (createNew) {
      const course = await createCourse(user, courseTitle, token);
      courseId = course._id;
    }

    if (!courseId) {
      alert("COURSE IS NOT SELECTED");
      return;
    }

    onChange(courseId);
    onSave({ courseId });

    onClose();
    setSelectedCourseId(courseId);
    setCreateNew(false);
  };

  const handleAddCourse = async () => {
    // try {
    //   const newCourse = await createCourse(user, courseTitle,token);
    //   console.log("Created course:", newCourse);
    //   // Update the courses list state
    //   setCourses((prevCourses) => [...prevCourses, newCourse]);
    //   console.log('courses === ' , courses)
    //   // Close the dialog
    //   onClose();
    // } catch (error) {
    //   console.log("Failed to create a new course:", error)
    // }
  };

  return (
    <>
      <Dialog onClose={onClose} open={isOpen} fullWidth>
        <DialogTitle>Set Course to Note</DialogTitle>
        <DialogContent>
          <Box sx={{ height: 12 }} />

          {!createNew && (
            <FormControl fullWidth>
              <InputLabel id="demo-controlled-open-select-label">
                Courses List
              </InputLabel>
              <Select
                sx={{ width: "50%" }}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openSelect}
                onClose={handleCloseSelect}
                onOpen={handleOpenSelect}
                value={selectedCourseId}
                label="Courses List"
                onChange={(e) => setSelectedCourseId(e.target.value)}
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={createNew}
                onChange={(e) => setCreateNew(e.target.checked)}
                name="course_name"
              />
            }
            label="Or create new course"
          />
          {createNew && (
            <FormControl fullWidth>
              <TextField
                label="Add New Course"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                sx={{ width: "50%" }}
              />
            </FormControl>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            padding: 2,
          }}
        >
          <Button
            color="primary"
            onClick={assignCourse}
            variant="contained"
            disabled={
              (!createNew && !selectedCourseId) || (!courseTitle && createNew)
            }
            endIcon={<Check />}
          >
            Assign and Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
