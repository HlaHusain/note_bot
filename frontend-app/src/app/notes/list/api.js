import { url } from "../../../config";

export const notes = async (token) => {
  const response = await fetch(`${url}/notes/get`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  });

  const notes = await response.json();

  return notes;
};
