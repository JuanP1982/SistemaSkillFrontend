import { useContext } from "react"
import { buscarUsuarioId } from "../service/usuario/usuario"
import { AuthContext } from "../contexts/authContext"

export const fetchUser = (userId) =>{
    buscarUsuarioId(userId).then((res)=>localStorage.setItem('user', JSON.stringify(res.data)))
    }