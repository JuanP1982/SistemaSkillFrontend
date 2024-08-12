import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    botaoIconeSenha:{
      display:'flex',
      position: 'absolute',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'transparent',
      width:40,
      height:40,
      right: 4,
      bottom:5,
    }
  });