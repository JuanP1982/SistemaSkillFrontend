import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/Login/LoginPage.jsx'
import { CadastroPage } from '../pages/Registro/CadastroPage.jsx'
import { HomePage } from '../pages/Home/HomePage.jsx'

export const Rotas = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path='/home' element={<HomePage/>}/>
        </Routes>
    </BrowserRouter>
  )
}
