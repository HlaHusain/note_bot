const API_BASE_URL = 'http://localhost:3000';

export const getNotesByCourseTitle = async (keyword) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/search/${keyword}`, {
        headers: {
          "Content-Type": "application/json",
        //   Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch notes by course title.");
      }
      console.log('response = ',response);
      const notes = await response.json();
      return notes;
    } catch (error) {
      throw new Error("Failed to fetch notes by course title.");
    }
  };
  