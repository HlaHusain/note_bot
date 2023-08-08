import { url } from "../../../config";

export const getSavedNotesByUserId = async (token,user_id) => {
  const response = await fetch(`${url}/notes/users/:user_id/savednotes`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },

  });

  const savedNotes = await response.json();

  if (!response.ok) {
    let error = new Error("Http status code" + response.status);
    error.data = savedNotes;
    error.status = response.status;
    error.message = response.message;
  }

  return savedNotes;
};
