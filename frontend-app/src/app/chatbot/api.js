import { url } from "../../config";



const chatCompletion = async ( message ,token) => {

try{
const response = await fetch(`${url}/chat`, {
  method: "post",
  headers: {
    "Content-type": "application/json",
    Authorization: token,
  },
  body: JSON.stringify({
    message,
})

});


const data = await response.json();
if (response.ok) {
  return data;
} else {
  throw new Error(data.message || 'Failed to create a new course.');
}
} catch (error) {
throw new Error('Failed to create a new course.');
}


}

export default chatCompletion;