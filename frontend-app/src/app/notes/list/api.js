import { url } from "../../../config";

export const getNotes = async (token,userId) => {


  const response = await fetch(`${url}/notes/${userId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  });



  const notes = await response.json();
  console.log('notes = ',notes['notes'])
  console.log(response)

if(!response.ok){
  let error = new Error("Http status code" + response.status )
  error.data=notes;
  error.status=response.status ;
  error.message=response.message;
  // throw error
  }

  return notes['notes'];
};
