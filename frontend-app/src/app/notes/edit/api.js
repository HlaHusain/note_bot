import { url } from "../../../config";

export const updateNote = async (
  token,
  title,
  sections,
  widgets,
  noteId,
  course
) => {
  const response = await fetch(`${url}/notes/${noteId}`, {
    method: "put",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      title,
      sections: sections,
      widgets: widgets,
      course:course
    }),
  });

  const res = await response.json();
  console.log('res ===' , res)
  return res;
};

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


export const getCourses = async (token, user) => {
  const response = await fetch(`${url}/courses/user/${user}`, {
    method: "GET",
    headers: { "Content-type": "application/json", Authorization: token },
  });

  const data = await response.json();

  if (!response.ok) {
    let error = new Error("Http status code" + response.status);
    error.data = data;
    error.status = response.status;
    throw error;
  }

  return data;
};
