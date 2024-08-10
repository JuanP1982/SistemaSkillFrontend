import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface loginType{
    email: string,
    senha: string
}

export interface UsuarioType{
    id: number,
    email: string,
    role:string,
    skills:[]
}

export interface senhaRecType{
    senha:string ,
    salvar:boolean
}

export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
};

export type CadastroScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'Cadastro'>;
export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'Login'>;