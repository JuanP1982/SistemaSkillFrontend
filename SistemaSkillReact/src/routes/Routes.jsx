import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/Login/LoginPage.jsx'
import { CadastroPage } from '../pages/Registro/CadastroPage.jsx'
import { HomePage } from '../pages/Home/HomePage.jsx'
import { AuthContext } from '../contexts/authContext.jsx'
import { LoginRedirect } from '../pages/LoginRedirect/LoginRedirect.jsx'

export const Rotas = () => {
  const {user} = useContext(AuthContext)
  return (
    <BrowserRouter>
    {user.role?  <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path='/home' element={<HomePage/>}/>
        </Routes>: <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path='/home' element ={<LoginRedirect/>}/>
        </Routes> }
       
    </BrowserRouter>
  )
}
