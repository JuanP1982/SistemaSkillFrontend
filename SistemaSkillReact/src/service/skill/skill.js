import { api } from "../api/Api";

export const listarTodasSkills = async () =>{
    const url = "/skills"
    const response = await api.get(url, {headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }})
    return response
}