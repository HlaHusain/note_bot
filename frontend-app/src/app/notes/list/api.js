import { url } from "../../../config";

export const getNotes = async (token, userId) => {
  const response = await fetch(`${url}/notes/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  });

  const notes = await response.json();

  if (!response.ok) {
    let error = new Error("Http status code" + response.status);
    error.data = notes;
    error.status = response.status;
    error.message = response.message;
  }

  return notes["notes"];
};

export const getFav = async (token, userId) => {
  const response = await fetch(`${url}/notes/favorite/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  });

  const favNotes = await response.json();

  console.log('favNotes' , favNotes)

  if (!response.ok) {
    let error = new Error("Http status code" + response.status);
    error.data = favNotes;
    error.status = response.status;
    error.message = response.message;
  }

  return favNotes.notes;
};

export const toggleNoteFavorite = async (noteId, token) => {
  const response = await fetch(`${url}/notes/${noteId}/favorite`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  });

  const res = await response.json();
  return res;
};
