import {url} from '../../../config'



export const getCourses  = async (token,user) =>{

    const response = await fetch(`${url}/courses/user/${user}` , {
        method : "GET",
        headers:{"Content-type":"application/json",
        Authorization: token
    },
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

export const createNote  = async ({token, title , course, user, sections, widgets}) =>{

const response = await fetch(`${url}/notes/` , {
    method : "POST",
    headers:{"Content-type":"application/json",
    Authorization: token},
    body:JSON.stringify({ title , course_id:course,user_id : user , sections, widgets})
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

export const addCourse = async ({token , course}) => {
    const response = await fetch(`${url}/courses/` , {
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