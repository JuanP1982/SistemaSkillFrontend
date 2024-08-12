import React from 'react'
import styles from './CadastroPage.module.css'
import { faEye, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cadastroApi } from '../../service/usuario/usuario'
import { info } from 'autoprefixer'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'

export const CadastroPage = () => {
  const navigate = useNavigate()
  const [confirmaSenha, setConfirmaSenha] = React.useState('')
  const [mostrarSenha, setMostrarSenha] = React.useState(false)
  const [estadoSenha, setEstadoSenha] = React.useState('password')
  const [userInfo, setUserInfo] = React.useState({
    email:"",
    senha:"",
    role:"ADMIN",
  })


  
  const handleCadastro = (e) => {
    e.preventDefault()

    if (userInfo.senha != confirmaSenha) {
      return toast.error('As senhas estão diferentes!')
    }

    cadastroApi(userInfo).then((res)=>{
      toast.success("Cadastro efetuado com sucesso! Redirecionando para o login")
      setTimeout(()=>navigate("/"),3000)
     })
     .catch((err)=>toast.error(err.response.data.titulo))
    
  }

  const handleSenhaVisivel = () =>{
    setMostrarSenha(!mostrarSenha)
    mostrarSenha === false? setEstadoSenha("password") : setEstadoSenha("text")
    return;
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setUserInfo({...userInfo,[name]:value})
    console.log(userInfo);
    
  }
  console.log(confirmaSenha);
  
  return (
    <div className={styles.container}>
      <ToastContainer/>
      <div className={styles.wrapper}>
        <form onSubmit={handleCadastro}>
          <h1>Cadastro</h1>
          <div className={styles.inputBox}>
            <input name='email' value={userInfo.email} onChange={handleChange} type='email' placeholder='Email' required />
            <FontAwesomeIcon className={styles.icone} icon={faUser} />
          </div>
          <div className={styles.inputBox}>
            <input name='senha' value={userInfo.senha} onChange={handleChange} type={estadoSenha} placeholder='Senha' required />
            <FontAwesomeIcon className={styles.iconeSenha} onClick={handleSenhaVisivel} icon={faEye} />
          </div>
          <div className={styles.inputBox}>
            <input name='confirmaSenha' value={confirmaSenha} onChange={(e)=>setConfirmaSenha(e.target.value)} type={estadoSenha} placeholder='Confirmar Senha' required />
            <FontAwesomeIcon className={styles.iconeSenha} onClick={handleSenhaVisivel} icon={faEye} />
          </div>

          <button type='submit' >Cadastrar</button>

          <div className={styles.linkLogin}>
            <p>Já tem uma conta? <Link to="/">Logar-se</Link></p>
          </div>
        </form>
    </div>
    </div>
  )
}