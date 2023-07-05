import { url } from "../../../config";

export const getNotes = async (token,userId) => {

  const userId1 = "649b222e842c035e50ecdd53";
  const response = await fetch(`${url}/notes/user/${userId1}`, {
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
