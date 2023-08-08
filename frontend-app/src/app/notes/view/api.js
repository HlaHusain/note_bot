import { url } from "../../../config";

export const getWidgets = async (token, noteId) => {
  const response = await fetch(`${url}/notes/${noteId}/widgets`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  });

  const note = await response.json();

  return note;
};

export const updateNoteRating = async (token, noteId, userId, rating) => {
  try {
    const response = await fetch(`${url}/notes/update-rating`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ noteId, userId, rating }),
    });

    const updatedRating = await response.json();

    if (!response.ok) {
      let error = new Error("HTTP status code" + response.status);
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

