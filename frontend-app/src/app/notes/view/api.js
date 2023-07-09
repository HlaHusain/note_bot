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

export const deleteNote = async (noteId, token) => {
   await fetch(`${url}/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  });
};
