import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React from 'react';
import {  } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faUser } from '@fortawesome/free-regular-svg-icons';
import { LoginScreenNavigationProp } from '../../interfaces/TypesUsuario';
import { useNavigation } from '@react-navigation/native';
import { cadastroApi } from '../../service/usuario/usuario';

export default function CadastroPage() {
    const navigation = useNavigation<LoginScreenNavigationProp>();
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#070707ed',
    },
    wrapper: {
        width: 320,
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    title: {
        fontSize: 32,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputBox: {
        position: 'relative',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 15,
        color: '#fff',
    },
    icone: {
        position: 'absolute',
        right: 15,
        top: 15,
        color: '#fff',
    },
    iconeSenha: {
        color: '#fff',
    },
    lembrarSenha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        color: '#fff',
    },
    link: {
        color: '#355bc2',
        textDecorationLine: 'underline',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkRegistro: {
        alignItems: 'center',
    },
    botaoIconeSenha: {
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: 40,
        height: 39,
        right: 4,
        bottom: 5,
    }
});
