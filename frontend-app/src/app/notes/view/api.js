import {url} from '../../../config'

export const note =async (token,noteId)=>{

    const response = await fetch(`${url}/note/${noteId}` , {
        method:"GET",
        headers:{
            "Content-type": "application/json",
            Authorization: token,
        },

    })

    const note = await response.json()

    return note


}