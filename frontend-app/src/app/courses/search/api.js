import { url } from "../../../config";

export const getNotesByCourseTitle = async (keyword,token) => {
    try {
      const response = await fetch(`${url}/notes/search/${keyword}`, {
        headers: { "Content-type": "application/json", Authorization: token },
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