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


  export const updateNoteRating = async (noteId, userId, rating) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/update_rating`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ noteId, userId, rating }),
      });
  
      const updatedRating = await response.json();
  
      if (!response.ok) {
        let error = new Error("HTTP status code " + response.status);
        error.data = updatedRating;
        error.status = response.status;
        error.message = response.message;
        throw error;
      }
  
      return updatedRating;
    } catch (error) {
      console.error("Error updating note rating:", error);
      throw error;
    }
  };
  
  