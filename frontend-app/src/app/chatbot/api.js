import axiosClient from "./axios.client";

export const chatCompletion = async ({ prompt }) => {
  try {
    const response = await axiosClient.post("chat", { prompt });

    return { response };
  } catch (err) {
    return { err };
  }
};