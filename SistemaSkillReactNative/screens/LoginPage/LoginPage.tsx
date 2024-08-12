import { View, Text, StyleSheet, TouchableOpacityBase, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faUser } from '@fortawesome/free-regular-svg-icons';
import Checkbox from 'expo-checkbox';
import { loginApi } from '../../service/usuario/usuario';
import {  LoginScreenNavigationProp, loginType, senhaRecType } from '../../interfaces/TypesUsuario';
import { AuthContext } from '../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AxiosError } from 'axios';
import { styles } from './LoginStyle';

export default function LoginPage() {
  const navigation = useNavigation<LoginScreenNavigationProp>()
  const {salvarUser, user} = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [senhaSalva, setSenhaSalva] = React.useState('')
  const [mostrarSenha, setMostrarSenha] = React.useState(true)
  const [senha, setSenha] = useState(senhaSalva)
  const [isChecked,setIsChecked] = useState(false)
    
  useEffect(() => {
    const recuperarSenha = async () => {
        try {
            const senhaRecJson = await AsyncStorage.getItem('senha');
           
            
            if (senhaRecJson) {
                const senhaRec:senhaRecType = JSON.parse(senhaRecJson)
                const senhaDecodificada = atob(senhaRec.senha);
                setSenhaSalva(senhaDecodificada);                
                setIsChecked(senhaRec.salvar)
                setSenha(senhaDecodificada)
                
            } else {
                setSenhaSalva(''); 
                setIsChecked(false)
            }
        } catch (error) {
            console.error("Erro ao recuperar a senha:", error);
        }
    };
    recuperarSenha();
  },[])

   const handleLogin = () => {
    const credenciais = {
        email: email.trim(),
        senha: senha 
    }
    loginApi(credenciais)
    .then((res) =>{
      salvarUser(res.data.usuario)
      AsyncStorage.setItem('token', res.data.token)
      navigation.navigate('Home')
    }).catch((err)=>
       ToastAndroid.show(err.response?.data?.titulo, ToastAndroid.TOP)
    )

    isChecked === true?
    AsyncStorage.setItem('senha',JSON.stringify({senha:btoa(senha), salvar:true}))
    : 
    AsyncStorage.setItem('senha', JSON.stringify({senha:"",salvar:false}))
    
  }
  
  return (
    <View style={styles.container}>
        <View style={styles.wrapper}>
            
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputBox}>
                <TextInput placeholderTextColor='#ffffff7a' style={styles.input} placeholder='Email' value={email} onChangeText={setEmail}></TextInput>
                <FontAwesomeIcon style={styles.icone} icon={faUser}/>
            </View>
            <View style={styles.inputBox}>
                <TextInput placeholderTextColor='#ffffff7a' secureTextEntry={mostrarSenha} style={styles.input} placeholder='Senha' value={senha} onChangeText={setSenha}></TextInput>
                <TouchableOpacity style={styles.botaoIconeSenha} onPress={()=>setMostrarSenha(!mostrarSenha)}>
            <FontAwesomeIcon style={styles.iconeSenha} icon={faEye} />
          </TouchableOpacity>
            </View>

            <View style={styles.lembrarSenha}>
            <Text style={styles.label}>Lembrar senha</Text>
                <Checkbox value={isChecked}
                 onValueChange={setIsChecked}
                 color={isChecked? 'green': undefined}
                 />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <View style={styles.linkRegistro}>
                <Text style={styles.label}>Não tem conta? <Text onPress={()=>navigation.navigate('Cadastro')} style={styles.link}> Cadastre-se</Text></Text>
            </View>

            </View>
      </View>
    
  )
}

    