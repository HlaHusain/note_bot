import { useMemo } from "react"
import { useNavigate } from "react-router-dom";
import { url } from "../config";

const getStorageObject =(user)=>{
    try{
        return JSON.parse(localStorage.getItem(user))
    }catch(error){
    
    }
}

export function useAuth(){

    let user = useMemo(()=> getStorageObject("user") , []);
    let token =useMemo(()=> localStorage.getItem("token") , [])

    const navigate=useNavigate()
    const isAuthorized=Boolean(token)

    const logout =()=>{
        fetch(`${url}/logout`, {
            methos:"POST",
            headers: {
                "Content-type": "application/json",
                Authorization: token,
              },
        })
        .then((res) => res.json())
        .then((res) => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate.push("/login")
        })

        
    }

    return {
        token,
        isAuthorized,
        logout,
        user
    }


}