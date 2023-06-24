import {url} from '../../../config'

export const courses =async (token)=>{

    const response = await fetch(`${url}/courses/get` , {
        method:"GET",
        headers:{
            "Content-type": "application/json",
            Authorization: token,
        },

    })

    const courses = await response.json()

    return courses


}