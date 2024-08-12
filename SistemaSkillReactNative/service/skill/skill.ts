import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../api/api";
import { AxiosError } from "axios";

export const listarTodasSkills = async () =>{
    const url = "/skills"
    const response = await api.get(url, {headers:{
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('token')
    }})
    
    return response
}


// implementar caso haja tempo - prioridade 1
// export const cadastrarSkill = async (info: any, file: any) => {
//     const url = "/skills/cadastrar";
//     const formData = new FormData();
    

//             formData.append('skill', new Blob([JSON.stringify(info)], { type: 'application/json' }));

//             const arquivo = await fetch(file.assets[0].uri)
//             const fileName = file.assets[0].fileName || 'photo.jpg';
//             const fileType = file.assets[0].type || 'image/jpeg';
//             console.log(arquivo);
//             const blob = await arquivo.blob()
//             console.log("blob",blob);
            
//             const arquivoEnviar = new File([blob], fileName, { type: fileType });
//             formData.append('file', arquivoEnviar)
       

//     try {
//         const response = await api.post(url, formData, {
//             headers: {
//                 'Authorization': 'Bearer ' + await AsyncStorage.getItem('token'),
//                 'Content-Type': 'multipart/form-data'
//             }
//         });
//         console.log(response);
//         return response;
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };