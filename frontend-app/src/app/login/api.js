import { url } from "../../config";

export const login  = async (email,password) =>{

const response = await fetch(`${url}/users/login/` , {
    method : "POST",
    headers:{"Content-type":"application/json", "Access-Control-Allow-Origin": "*",},
    body:JSON.stringify({email,password})
}
)

const data = await response.json()

if(!response.ok){
let error = new Error("Http status code" +response.status )
error.data=data;
error.status=response.status ;
throw error
}

return data
}