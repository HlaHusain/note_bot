const API_BASE_URL = 'http://localhost:3000';

// Get all courses
export const getAllCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      headers: {
        'Content-Type': 'application/json',
      },
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
export const getCoursesByUserId = async (user_id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/user/${user_id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
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
export const createCourse = async (user_id, title) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
export const deleteCourseWithNotes = async (course_id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${course_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete the course.');
    }
  } catch (error) {
    throw new Error('Failed to delete the course.');
  }
};
