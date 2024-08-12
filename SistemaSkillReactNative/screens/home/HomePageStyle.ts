import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#070707ed',
      padding: 16,
    },
    bemVindo: {
      marginBottom: 20,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    welcomeText: {
      color: '#fff',
      fontSize: 20,
    },
    icon: {
      color: '#fff',
    },
    contentArea: {
      flex: 1,
      flexDirection:'column',
      gap:20,
    },
    renderError: {
      textAlign: 'center',
      color: '#ccc',
      marginTop: 20,
      textDecorationLine: 'underline',
    },
    buttonArea:{
      flexDirection: 'row',
      justifyContent:'space-between',
      marginTop:10,
    },
    TextButton:{
      color: '#fff',
      fontSize: 16,
    },
    button:{
      backgroundColor: '#60d4ea',
      padding:5,
      borderWidth:3,
      borderColor:'#27c3e2f8',
      borderRadius:23,
    },
  });