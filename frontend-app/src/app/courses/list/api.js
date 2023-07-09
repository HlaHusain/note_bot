//import axios from "axios";
//const baseUrl = "http://localhost:3000";
import axiosClient from "./axios.client";

export const getCourses = async () => {
  try {
    const response = await axiosClient.get("/courses/test");
    return response.data.courses;
  } catch (error) {
    throw new Error("Failed to fetch the course.");
  }
};


export const getCoursesByUserId = async (user_id) => {
  try {
    const response = await axiosClient.get(`/courses/user/${user_id}`);
    const courses = response.data.courses;

    // Add the id property to each course object
    const coursesWithId = courses.map((course) => ({
      id: course._id,
      ...course,
    }));

    return coursesWithId;
  } catch (error) {
    throw new Error("Failed to fetch courses.");
  }
};

export const createCourse = async (user_id, title) => {
  try {
    const response = await axiosClient.post(`/courses`, {
      user_id,
      title,
    });
    console.log(response); // Log the response for debugging

    if (response.status === 200) {
      return response.data.course;
    } else {
      throw new Error(response.data.message || 'Failed to create a new course.');
    }
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create a new course.');
  }
};
// export const deleteCourseWithNotes = async (courseId) => {
//   console.log('courseId = ',courseId);
//   try {
//     await axiosClient.delete(`/courses/${courseId}`);
//     return true;
//   } catch (error) {
//     throw new Error("Failed to delete the course.");
//   }
// };


export const deleteCourseWithNotes = async (course_id) => {
  try {
    const response = await axiosClient.delete(`/courses/${course_id}`);
    if (response.status !== 204) {
      throw new Error('Failed to delete the course.');
    }
    return true;
  } catch (error) {
    throw new Error('Failed to delete the course.');
  }
};