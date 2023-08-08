import { url } from "../../../config";

export const getFavNotes = async (token, userId) => {

  
  const response = await fetch(`${url}/notes/users/${userId}/favorite`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  });

  const notes = await response.json();

  console.log('notes' , notes)

  if (!response.ok) {
    let error = new Error("Http status code" + response.status);
    error.data = notes;
    error.status = response.status;
    error.message = response.message;
  }

  return notes["notes"];
};
