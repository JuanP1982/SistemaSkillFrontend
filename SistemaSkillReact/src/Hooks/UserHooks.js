import { useContext } from "react"
import { buscarUsuarioId } from "../service/usuario/usuario"
import { AuthContext } from "../contexts/authContext"

function useFetchUser(){
    const { user, salvarUser } = useContext(AuthContext)
    
    const fetchUser = (userId) =>{
    buscarUsuarioId(userId).then((res)=>salvarUser(res.data))
    }
    return fetchUser
}

export default useFetchUser;
//localStorage.setItem('user', JSON.stringify(res.data))