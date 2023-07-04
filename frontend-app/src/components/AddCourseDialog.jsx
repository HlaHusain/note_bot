import React, { useState } from "react";
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
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Check } from "@mui/icons-material";

export function AddCourseDialog({
  courses,
  onChange,
  isOpen,
  onClose,
  course,
}) {
  const [openSelect, setOpenSelect] = React.useState(false);

  const handleOpenSelect = () => setOpenSelect(formLabelClasses);
  const handleCloseSelect = () => setOpenSelect(false);

  const assignCourse = (e) => {
    const course = e.target.value;
    onChange(course);
  };

  return (
    <>
      <Dialog onClose={onClose} open={isOpen} fullWidth>
        <DialogTitle>Set Course to Note</DialogTitle>
        <DialogContent
           
        >
          <Box sx={{height:12}}/>
          
          <FormControl fullWidth>
            <InputLabel id="demo-controlled-open-select-label">
              Courses List
            </InputLabel>
            <Select
              fullWidth
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openSelect}
              onClose={handleCloseSelect}
              onOpen={handleOpenSelect}
              value={course}
              label="Courses List"
              onChange={assignCourse}
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions
          sx={{
            padding: 2,
          }}
        >
          <Button
            color="primary"
            onClick={onClose}
            variant="contained"
            disabled={!course}
            endIcon={<Check />}
          >
            Assign this course
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
