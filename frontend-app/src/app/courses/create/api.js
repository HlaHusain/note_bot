import { url } from "../../../config";

// Create a new course
export const createCourse = async (user, title,token) => {
    try {
      const response = await fetch(`${url}/courses`, {
        method: 'POST',
        headers: { "Content-type": "application/json", Authorization: token },
        body: JSON.stringify({ user, title }),
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