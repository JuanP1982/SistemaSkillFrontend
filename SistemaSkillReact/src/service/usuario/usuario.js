import { api } from "../api/Api";

export const loginApi = async (info) =>{
    const url = "/auth/login"
    const response = await api.post(url, info)
    return response
    
}

export const cadastroApi = async (info) =>{
    const url = "/usuarios/cadastrar"
    const response = await api.post(url, info)
    return response
}

export const removerSkill = async (info) =>{    
    const url = `/usuarios/${info.usuarioId}/removerskill/${info.skillId}`
    const response = await api.delete(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
      return response
      
}

export const buscarUsuarioId = async (id) =>{
    const url = `/usuarios/${id}`
    const response = await api.get(url, {headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }})
    return response
}

export const atualizarNivel = async (info) =>{
    const url = `/usuarios/${info.usuarioId}/atualizarnivel`
    const response = await api.put(url, info, {
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
 })
 return response
}

export const atribuirSkill = async (info) =>{
    const url = `/usuarios/adicionarskill`
    const response = await api.post(url, info, {
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    return response
}