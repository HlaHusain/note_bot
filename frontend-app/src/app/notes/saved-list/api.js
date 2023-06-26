import { url } from "../../../config";

export const savedNotes = async (token) => {
  const response = await fetch(`${url}/notes/saved`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  });

  const savedNotes = await response.json();

  return savedNotes;
};
