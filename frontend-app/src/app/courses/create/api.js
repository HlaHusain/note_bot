import url from '../../../config'
const course  = async ({token,course}) =>{

const response = await fetch(`${url}/course/` , {
    method : "POST",
    headers:{"Content-type":"application/json",
    Authorization: token},
    body:JSON.stringify({course})
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