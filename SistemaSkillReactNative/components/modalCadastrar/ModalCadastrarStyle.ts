import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(251, 247, 247, 0.1)',
    },
    conteudoModal: {
      width: '80%',
      backgroundColor: '#2f3332',
      borderRadius: 23,
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 30,
      color: 'white',
    },
    closeIcon: {
      padding: 10,
    },
    conteudo: {
      marginTop: 20,
    },
    input: {
      backgroundColor: 'transparent',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 5,
      color: 'white',
      padding: 10,
      marginBottom: 10,
    },
    textarea: {
      backgroundColor: 'transparent',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 5,
      color: 'white',
      padding: 10,
      marginBottom: 10,
    },
    fileButton: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
      alignItems: 'center',
      flexDirection: 'row',
    },
    fileButtonSelected: {
      borderColor: '#0bff03',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
      alignItems: 'center',
      flexDirection: 'row',
    },
    fileButtonText: {
      marginLeft: 10,
      color: 'white',
    },
    previewImage: {
      width: 100,
      height: 100,
      marginTop: 10,
      borderRadius: 5,
    },
    submitButton: {
      backgroundColor: 'white',
      borderRadius: 23,
      padding: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    submitButtonText: {
      color: 'black',
      fontSize: 16,
    },
  });
  

  