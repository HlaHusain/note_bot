import { url } from "../../../config";

export const home = async (token) => {
  const response = await fetch(`${url}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  });

  return await response.json();
};
