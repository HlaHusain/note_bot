import { url } from "../../config";

const chatCompletion = async (message, token, onResponse) => {
  const response = await fetch(`${url}/chat`, {
    method: "post",
    headers: {
      Accept: "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Content-type": "application/json",
      Authorization: token,
    },

    keepalive: true,

    body: JSON.stringify({
      message,
    }),
  });

  const reader = response.body.getReader();

  let answer = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    
    console.log(new TextDecoder().decode(value));
    const string = new TextDecoder().decode(value).substring(6);
    answer += string;
    onResponse(answer);
  }
};

export default chatCompletion;
