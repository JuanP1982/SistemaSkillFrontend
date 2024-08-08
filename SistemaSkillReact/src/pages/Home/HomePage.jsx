import React, { useContext } from 'react'
import styles from './HomePage.module.css'
import { AuthContext } from '../../contexts/authContext'
import ImgMediaCard from '../../components/CardSkill/CardSkill'
import Card from '../../components/CardSkill/CardSkill'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { atualizarNivel, removerSkill } from '../../service/usuario/usuario'
import { info } from 'autoprefixer'
import { toast, ToastContainer } from 'react-toastify'
import { fetchUser } from '../../Hooks/UserHooks'
import { ModalAtribuir } from '../../components/ModalAtribuir/ModalAtribuir'


export const HomePage = () => {
    const navigate = useNavigate()
    const {user, salvarUser} = useContext(AuthContext)
    const [modalAtribuir, setModalAtribuir] = React.useState(false)
    const [skills, setSkills] = React.useState(user? user.skills: [])
    console.log(user);

    React.useEffect(()=>{
        setSkills(user.skills)
    },[user])

    const handleModalAtribuir = () =>{
        setModalAtribuir(!modalAtribuir)
    }

    const handleLogout = () =>{
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate("/")
    }
    const handleDeleteSkill = (idSelecionado) =>{
        const info = {
            usuarioId:user.id,
            skillId:idSelecionado
        }
        removerSkill(info).then((res)=>{
            salvarUser(res.data)
            setSkills(res.data.skills)
            toast.success('Skill removida com sucesso')
        }).catch((err)=>toast.error('Falha ao remover a skill'))
    }
    
    const handleAtualizarNivel = (skill,novoNivel) =>{
        const info = {
            usuarioId:user.id,
            skillId:skill,
            nivel:novoNivel
          }
          atualizarNivel(info).then((res)=>fetchUser(user.id)).catch((err)=>toast.error("Houve um erro ao atualizar o nivel da Skill"))
          
    }
    console.log(skills);
    
    // const atualizarSkillList = (skillNova) =>{
    //     const novaLista = skills.map((item)=>{
    //         if(item.skill.nome === skillNova.skill.nome){
    //             return {...item,...skillNova}
    //         }
    //         return item;
    //     })
    //     setSkills(novaLista);
    // }

  return (
    <div className={styles.container}>
        <div className={styles.bemVindo}>
            <div className={styles.headerContent}>
            <p>Bem vindo, {user.email.split('@gmail.com')}!</p>
            <ul className={styles.opcoes}>
                <li >Cadastrar Skill</li>
                <li onClick={handleModalAtribuir} >Atribuir skill</li>
            </ul>
            <FontAwesomeIcon
            onClick={handleLogout}
            className={`${styles.icon} fa-2xl`}
            icon={faDoorOpen}
          />
            </div>
        </div>
        <div className={styles.contentArea}>
            {skills.map((skill)=>
            <Card handleAtualizar={handleAtualizarNivel} handleDeletar={handleDeleteSkill} key={skill.id} props={skill} />
            )}
        </div>
        {skills.length <= 0 &&(
            <p role='button' onClick={handleModalAtribuir} className={styles.renderError}>Nada por aqui... Tente atribuir uma skill!</p>
        )}

        {modalAtribuir &&(
            <div className={styles.modalAtribuir}>
            <ModalAtribuir userId={user.id} close={handleModalAtribuir}></ModalAtribuir>
            </div>
        )}
        <ToastContainer/>
    </div>
  )
}
