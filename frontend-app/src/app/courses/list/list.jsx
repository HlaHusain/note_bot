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
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PageHeader } from "../../../components/PageHeader";
import { MenuComponent } from "../../../components/Menu";
import { CreateCourseDialog } from "../create/create";
// import { getCourses, getCoursesByUserId } from "./api";
import { deleteCourseWithNotes , getCoursesByUserId } from "./course.api";
import { useAuth } from "../../../contexts/AuthProvider";

//import { getAllCourses, getCoursesByUserId, createCourse, deleteCourseWithNotes } from "./course.api";

export const CoursesList = () => {
  const [refresh, setRefresh] = useState(false);
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const { token, user} = useAuth();

  // const { user_id } = useParams();
  // console.log(user_id);

  console.log('courses ======'  , courses)


  useEffect(() => {

    const fetchCourses = async () => {
      try {
        const fetchedCourses = await getCoursesByUserId(user,token);
        setCourses(fetchedCourses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();

    console.log('refresh' , refresh)

        // setRefresh(false);
  }, [refresh]);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

// Handle course deletion
const handleDeleteCourse = async (courseId) => {
  try {
    await deleteCourseWithNotes(courseId,token);
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== courseId)
    );
    setRefresh(true)
  } catch (error) {
    console.error(error);
  }
};


  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <PageHeader
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
        user_id={user}
        setCourses={setCourses}
      />
    )}
      
      <TableContainer
        component={Paper}
        sx={{
          // margin: "20px auto",
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
                  // fontSize: "22px",
                  textAlign: "center",
                }}
              >
                Course Title
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  // fontSize: "22px",
                  textAlign: "center",
                }}
              >
                Number of Notes
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  // fontSize: "22px",
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
                key={course._id}
                sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
              >
                <TableCell
                  sx={{
                    // fontSize: "22px",
                    color: "#ED7D31",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {course.title}

                </TableCell>
                <TableCell
                  sx={{
                    // fontSize: "22px",
                    color: "#ED7D31",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {course.notes_count}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <IconButton onClick={() => handleDeleteCourse(course._id)}>
                    <DeleteIcon style={{ color: "#ED7D31" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
