import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PHeader } from "../../../components/PHeader";
import { MenuComponent } from "../../../components/Menu";
import { CreateCourseDialog } from "../create/create";
import { getCourses, getCoursesByUserId } from "./api";
import { deleteCourseWithNotes } from "./course.api";

//import { getAllCourses, getCoursesByUserId, createCourse, deleteCourseWithNotes } from "./course.api";

export const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);


  // const { user_id } = useParams();
  // console.log(user_id);

  const user_id = "649b6f816615c87ac498d9e9";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await getCoursesByUserId(user_id);
        setCourses(fetchedCourses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const fetchedCourses = await getCourses();
  //       console.log('fetch: ',fetchedCourses);
  //       setCourses(fetchedCourses);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchCourses();
  // }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

// Handle course deletion
const handleDeleteCourse = async (courseId) => {
  try {
    await deleteCourseWithNotes(courseId);
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== courseId)
    );
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div>
      <MenuComponent />
      <PHeader
      title="My Courses"
      actions={[
        {
          label: "Add Course",
          startIcon: <AddIcon />,
          color: "primary",
          onClick: handleOpen,
          disableElevation: true,
        },
      ]}
    />
    {open && (
      <CreateCourseDialog
        isOpen={open}
        onClose={handleClose}
        courses={courses}
        user_id={user_id}
        setCourses={setCourses}
      />
    )}
      
      <TableContainer
        component={Paper}
        sx={{
          margin: "20px auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "1400px",
        }}
      >
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "22px",
                  textAlign: "center",
                }}
              >
                Course Title
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "22px",
                  textAlign: "center",
                }}
              >
                Number of Notes
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "22px",
                  textAlign: "center",
                }}
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow
                key={course.id}
                sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
              >
                <TableCell
                  sx={{
                    fontSize: "22px",
                    fontFamily: "Poppins",
                    color: "#ED7D31",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {course.title}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "22px",
                    fontFamily: "Poppins",
                    color: "#ED7D31",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {course.notes.length}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <IconButton onClick={() => handleDeleteCourse(course.id)}>
                    <DeleteIcon style={{ color: "#ED7D31" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
