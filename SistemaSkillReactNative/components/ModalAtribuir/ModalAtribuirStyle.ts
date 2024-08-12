import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:'relative',
        right:0,
        bottom:'35%',
        },
    conteudoModal: {
        backgroundColor:'#373739',
        width:"auto",
        height:500,
    },
    botaoAtribuir:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#60d4ea',
        width:120,
        height:35,
        borderRadius:23,
    },
    buttonArea:{
        position:'absolute',
        alignSelf:'flex-end',
        right:15,
        bottom:15
    },
    viewArea:{
        flexDirection:'column',
        backgroundColor:'transparent',
        width:'auto',
        height:"77%"
    },
    configurar:{
        flexDirection:'row',
    },
    nomeArea:{
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'red',
        flexGrow:2,
        width:"40%",
        gap:5
    },
    iconeNome:{
        color:"white",
    },
    nivelArea:{
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        flexGrow:1,
        gap:5
    },
    textWhite:{
        color:'#fff',
    },
    botaoDiminuir:{
        // backgroundColor:'#60d4ea',
        width:17
    }

})

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, 
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'gray',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, 
    },
    
  });