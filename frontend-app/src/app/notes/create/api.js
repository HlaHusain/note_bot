import url from '../../../config'
const note  = async ({token,note}) =>{

const response = await fetch(`${url}/note/` , {
    method : "POST",
    headers:{"Content-type":"application/json",
    Authorization: token},
    body:JSON.stringify({note})
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