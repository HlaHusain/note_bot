import {url} from "../../config"

export const signup = async (email,password ,username,study) =>{


    console.log({
        user_name:username,
        email:email,
        password:password,
        study_field:study
    })

const response = await fetch (`${url}/users/signup/` ,{
    method:"POST",
    headers:{
        "Content-type":"application/json",
        "Access-Control-Allow-Origin": "*",

    },
    body:JSON.stringify(
        {
            user_name:username,
            email:email,
            password:password,
            study_field:study
        }
    )

})

const data =await response.json()

if(!response.ok){
    let error = new Error("Http status code" + response.status)
    error.data=data;
    error.status=response.status;
    throw error;

}

return data

}