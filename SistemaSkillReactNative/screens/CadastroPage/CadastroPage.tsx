import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React from 'react';
import {  } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faUser } from '@fortawesome/free-regular-svg-icons';
import { CadastroScreenNavigationProp } from '../../interfaces/TypesUsuario';
import { useNavigation } from '@react-navigation/native';
import { cadastroApi } from '../../service/usuario/usuario'
import { styles } from './CadastroStyle'

export default function CadastroPage() {
    const navigation = useNavigation<CadastroScreenNavigationProp>();
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [confirmaSenha, setConfirmaSenha] = React.useState('');
    const [mostrarSenha, setMostrarSenha] = React.useState(true);
    const [mostrarConfirmaSenha, setMostrarConfirmaSenha] = React.useState(true);
    console.log(mostrarConfirmaSenha);

    const handleCadastro = () =>{
        if (email != '' && senha != '' && senha === confirmaSenha) {
            const info = {
                email: email.toLowerCase().trim(),
                senha: senha,
                role: 'ADMIN'
            }
            cadastroApi(info).then((res)=>{
                ToastAndroid.showWithGravity('Cadastro Realizado com sucesso', ToastAndroid.SHORT, ToastAndroid.TOP)
                setTimeout(() => {
                    navigation.navigate('Login')
                }, 3000);
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Cadastro</Text>
                <View style={styles.inputBox}>
                    <TextInput
                        placeholderTextColor='#fff'
                        style={styles.input}
                        placeholder='Email'
                        value={email}
                        onChangeText={setEmail}
                    />
                    <FontAwesomeIcon style={styles.icone} icon={faUser} />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        secureTextEntry={mostrarSenha}
                        style={styles.input}
                        placeholder='Senha'
                        value={senha}
                        onChangeText={setSenha}
                    />
                    <TouchableOpacity
                        style={styles.botaoIconeSenha}
                        onPress={() => setMostrarSenha(!mostrarSenha)}
                    >
                        <FontAwesomeIcon style={styles.iconeSenha} icon={faEye} />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        secureTextEntry={mostrarConfirmaSenha}
                        style={styles.input}
                        placeholder='Confirmar Senha'
                        value={confirmaSenha}
                        onChangeText={setConfirmaSenha}
                    />
                    <TouchableOpacity
                        style={styles.botaoIconeSenha}
                        onPress={()=>setMostrarConfirmaSenha(!mostrarConfirmaSenha)}
                    >
                        <FontAwesomeIcon  style={styles.iconeSenha} icon={faEye} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
                <View style={styles.linkRegistro}>
                    <Text style={styles.label}>
                        Já tem uma conta? 
                        <Text
                            onPress={() => navigation.navigate('Login')}
                            style={styles.link}
                        >
                            Logar-se
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
}

