const API_BASE_URL = 'http://localhost:3000';

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