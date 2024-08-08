import React, { useContext } from 'react'
import styles from './LoginPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { loginApi } from '../../service/usuario/usuario'
import { AuthContext } from '../../contexts/authContext'
import { recuperarItem } from '../../service/localStorage'
import { Link, useNavigate } from 'react-router-dom'




export const Login = () => {
  const {salvarUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const [mostrarSenha,setMostrarSenha] = React.useState(false)
  const [estadoSenha,setEstadoSenha] = React.useState('password')
  const [senhaSalva, setSenhaSalva] = React.useState(()=>{
    const senhaRec = recuperarItem('senha')
    return senhaRec? atob(senhaRec.senha) : ''
  })
  const [salvarSenha, setSalvarSenha] = React.useState(()=>{
    const senhaRec = recuperarItem('senha')
    return senhaRec? senhaRec.salvar : false
  })
  const [userInfo,setUserInfo] = React.useState({
    email: '',
    senha: senhaSalva
  })



  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setUserInfo({...userInfo,[name]:value})
    console.log(userInfo);
    
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const res =  loginApi(userInfo).then((res)=>{
      console.log(res);
      
      salvarUser(res.data.usuario)
      localStorage.setItem('token', res.data.token)
      navigate('/home')
    }).catch((err)=>console.log(err))

    salvarSenha === true?
    localStorage.setItem('senha',JSON.stringify({senha:btoa(userInfo.senha), salvar:true}))
    : 
    localStorage.setItem('senha', JSON.stringify({senha:"",salvar:false}))
  }

  const handleSenhaVisivel = () =>{
    setMostrarSenha(!mostrarSenha)
    mostrarSenha === false? setEstadoSenha("password") : setEstadoSenha("text")
    return;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className={styles.inputBox}>
            <input name='email' value={userInfo.email} onChange={handleChange} type='email' placeholder='Email' required />
            <FontAwesomeIcon className={styles.icone} icon={faUser} />
          </div>
          <div className={styles.inputBox}>
            <input name='senha' value={userInfo.senha} onChange={handleChange} type={estadoSenha} placeholder='Senha' required />
            <FontAwesomeIcon className={styles.iconeSenha} onClick={handleSenhaVisivel} icon={faEye} />
          </div>

          <div className={styles.lembrarSenha}>
            <label ><input type="checkbox" defaultChecked={salvarSenha} onChange={()=>setSalvarSenha(!salvarSenha)} />Lembrar senha</label>
            <a href="#">esqueceu sua senha?</a>
          </div>

          <button type='submit'>Login</button>

          <div className={styles.linkRegistro}>
            <p>Não tem uma conta? <Link to='/cadastro'>Cadastrar-se</Link></p>
          </div>
        </form>
    </div>
    </div>
  )
}
