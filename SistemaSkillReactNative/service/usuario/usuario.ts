import { loginType } from "../../interfaces/TypesUsuario"
import { api } from "../api/api"

export const loginApi = async (info: loginType) => {
        const url = "/auth/login";
        const response = await api.post(url, info);
        return response;
    
}

export const cadastroApi = async (info:loginType) =>{
        const url = "/usuarios/cadastrar"
        const response = await api.post(url, info);
        return response
}