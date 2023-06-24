import url from '../../config'
const login  = async ({email,password}) =>{

const response = await fetch(`${url}/users/login/` , {
    method : "POST",
    headers:{"Content-type":"application/json"},
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