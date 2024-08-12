import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#130e0ec9',
      margin: 10,
      borderRadius: 10,
      overflow: 'hidden',
    },
    imagem: {
      width: 130,
      height: 200,
      borderRadius: 10,
    },
    conteudo: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    info: {
      flex: 1,
      marginLeft: 10,
    },
    titulo: {
      fontSize: 20,
      color: 'white',
      backgroundColor: '#80808037',
      padding: 5,
      borderRadius: 5,
    },
    descricao: {
      marginVertical: 10,
      backgroundColor: '#1c1e3194',
      padding: 5,
      borderRadius: 5,
    },
    descricaoText: {
      fontSize: 17,
      color: '#fff',
    },
    nivelArea: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#0000ff2f',
      padding: 5,
      borderRadius: 5,
    },
    nivelLabel: {
      fontSize: 20,
      color: '#fff',
    },
    buttonNivelArea: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
    },
    buttonArea: {
      // backgroundColor: '#ff000039',
      borderRadius: 20,
      padding: 10,
      marginHorizontal: 5,
    },
    buttonText: {
      fontSize: 30,
      color: '#fff',
    },
    nivel: {
      fontSize: 30,
      color: '#fff',
    },
  });
  
export const modalStyle = StyleSheet.create({
    container: {
      position: 'absolute',
      top:'35%',
      left:'7%',
      alignSelf: 'center',
      width: 300,
      backgroundColor: '#000000e2',
      borderRadius: 10,
      padding: 10,
      elevation: 5,
    },
    opcoes: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    button: {
      backgroundColor: '#60d4ea',
      padding: 10,
      borderRadius: 23,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  