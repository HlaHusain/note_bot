import { url } from "../../../config";

// Get all courses
export const getAllCourses = async (token) => {
  try {
    const response = await fetch(`${url}/courses`, {
      headers: { "Content-type": "application/json", Authorization: token },
    });
    const data = await response.json();
    if (response.ok) {
      return data.courses;
    } else {
      throw new Error(data.message || 'Failed to fetch courses.');
    }
  } catch (error) {
    throw new Error('Failed to fetch courses.');
  }
};

// Get courses by user ID
export const getCoursesByUserId = async (user_id,token) => {
  try {
    const response = await fetch(`${url}/courses/user/${user_id}`, {
      headers: { "Content-type": "application/json", Authorization: token },
    });
    const data = await response.json();
    if (response.ok) {
      return data.courses;
    } else {
      throw new Error(data.message || 'Failed to fetch courses.');
    }
  } catch (error) {
    throw new Error('Failed to fetch courses.');
  }
};

// Create a new course
export const createCourse = async (user_id, title,token) => {
  try {
    const response = await fetch(`${url}/courses`, {
      method: 'POST',
      headers: { "Content-type": "application/json", Authorization: token },
      body: JSON.stringify({ user_id, title }),
    });
    const data = await response.json();
    if (response.ok) {
      return data.course;
    } else {
      throw new Error(data.message || 'Failed to create a new course.');
    }
  } catch (error) {
    throw new Error('Failed to create a new course.');
  }
};

// Delete a course and its notes
export const deleteCourseWithNotes = async (course_id,token) => {
  try {
    const response = await fetch(`${url}/courses/${course_id}`, {
      method: 'DELETE',
      headers: { "Content-type": "application/json", Authorization: token },
    });
    if (!response.ok) {
      throw new Error('Failed to delete the course.');
    }
  } catch (error) {
    throw new Error('Failed to delete the course.');
  }
};
