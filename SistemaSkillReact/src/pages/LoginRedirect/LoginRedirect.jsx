import React from 'react'

export const LoginRedirect = () => {
  return (
    <div style={
        {display:'flex',
            width:'100vw',
            height:'100vh',
            flex:'1',
            justifyContent:'center',
            alignItems:'center',
            fontSize:'50px'
        }}><a href='/'>Ops... É necessário estar logado para continuar!</a></div>
  )
}
