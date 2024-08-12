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
import useFetchUser from '../../Hooks/UserHooks'
import { ModalAtribuir } from '../../components/ModalAtribuir/ModalAtribuir'
import { ModalCadastrar } from '../../components/modalCadastrar/ModalCadastrar'
import { ModalDeletarSkill } from '../../components/ModalDeletarSkill/ModalDeletarSkill'


export const HomePage = () => {
    const fetchUser = useFetchUser()
    const navigate = useNavigate()
    const {user, salvarUser} = useContext(AuthContext)
    const [modalAtribuir, setModalAtribuir] = React.useState(false)
    const [modalCadastrar, setModalCadastrar] = React.useState(false)
    const [modalDeletar,setModalDeletar] = React.useState(false)
    const [skills, setSkills] = React.useState(user? user.skills: [])
    const [dropdownAtribuir, setDropdownAtribuir] = React.useState(false)
    const [dropdownSkill, setDropdownSkill] = React.useState(false)
    console.log(user);

    React.useEffect(()=>{
        setSkills(user.skills)
    },[user])

    const handleDropdownAtribuir = () =>{
        setDropdownAtribuir(!dropdownAtribuir)
        dropdownSkill ? setDropdownSkill(false) : null
    }

    const handleDropdownSkill = () =>{
        setDropdownSkill(!dropdownSkill)
        dropdownAtribuir ? setDropdownAtribuir(false) : null
    }

    const handleModalAtribuir = () =>{
        setModalAtribuir(!modalAtribuir)
        setDropdownAtribuir(false)
    }

    const handleModalCadastrar = () =>{
        setModalCadastrar(!modalCadastrar)
        setDropdownSkill(false)
    }
    const handleModalDeletar = () =>{
        setModalDeletar(!modalDeletar)
        setDropdownSkill(false)
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
        }).catch((err)=>toast.error(err.response.data.titulo))
    }

    const reloadSkills = (skills) =>{
        setSkills(skills)
    }
    
    const handleAtualizarNivel = (skill,novoNivel) =>{
        const info = {
            usuarioId:user.id,
            skillId:skill,
            nivel:novoNivel
          }
          atualizarNivel(info).then((res)=>fetchUser(user.id)).catch((err)=>toast.error(err.response.data.titulo))
          
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
    console.log(skills)
  return (
    <div className={styles.container}>
        <div className={styles.bemVindo}>
            <div className={styles.headerContent}>
            <p>Bem vindo, {user.email.split('@gmail.com')}!</p>
            <ul className={styles.opcoes}>
                <li onMouseDown={handleDropdownSkill} onMouseOver={handleDropdownSkill} onClick={handleDropdownSkill}>Gerenciar Skills</li>
                <li onMouseDown={handleDropdownAtribuir} onMouseOver={handleDropdownAtribuir}>Atribuir Skill</li>
                {dropdownAtribuir &&(
                    <div className={styles.dropdown}>
                        <ul className={styles.opcoesDropdown}>
                            <li onClick={handleModalAtribuir}>Atribuir Skill</li>
                        </ul>
                    </div>
                )}
                {dropdownSkill &&(
                    <div className={styles.dropdownSkill}>
                        <ul className={styles.opcoesDropdown}>
                            <li onClick={handleModalCadastrar}>Cadastrar Skill</li>
                            {/* implementar caso haja tempo - prioridade 1 */}
                            {/* <li onClick={()=>alert('atualizar')}>Editar Skill</li> */}
                            <li onClick={handleModalDeletar}>Remover Skill</li>
                        </ul>
                    </div>
                )}
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
            <ModalAtribuir reload={reloadSkills} userId={user.id} close={handleModalAtribuir}></ModalAtribuir>
            </div>
        )}

        {modalCadastrar &&(
            <div className={styles.modalAtribuir}>
                <ModalCadastrar reload={reloadSkills} userId={user.id} close={handleModalCadastrar}/>
            </div>
        )}
        {modalDeletar &&(
            <div className={styles.modalAtribuir}>
                <ModalDeletarSkill reload={reloadSkills} userId={user.id} close={handleModalDeletar}/>
            </div>
        )}

        <ToastContainer/>
    </div>
  )
}
