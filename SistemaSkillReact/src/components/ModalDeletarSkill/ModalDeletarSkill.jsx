import React, { useEffect } from 'react'
import styles from './ModalDeletarSkill.module.css'
import { deletarSkill, listarTodasSkills } from '../../service/skill/skill'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faTrash } from '@fortawesome/free-solid-svg-icons'
import useFetchUser from '../../Hooks/UserHooks'

export const ModalDeletarSkill = ({close,userId, reload}) => {
    const [skills, setSkills] = React.useState([])
    const fetchUser = useFetchUser()
    console.log(skills);
    
    const splitName = (nome) =>{
        const nomeSkill = nome
        const novoNome =  nomeSkill.length > 25 ? `${nomeSkill.substring(0, 25)}...` : nomeSkill;
        return novoNome;
    }
    
    const handleDelete = (id) =>{
        deletarSkill(id).then((res)=>{
            toast.success(res.data)
            fetchUser(userId)
        }).catch((err)=>toast.error(err.response.data.titulo))
       
        
    }
    useEffect(()=>{
        listarTodasSkills()
        .then((res)=>setSkills(res.data))
        .catch((err)=>toast.error('Houve uma falha ao carregar as skills!'))
    },[handleDelete])



  return (
    <div className={styles.containerModal}>
        <div className={styles.conteudoModal}>
            <div className={styles.header}>
                <h1>Remover Skills</h1>
                <FontAwesomeIcon onClick={close} className={styles.closeIcon} icon={faClose}/>
                </div>
            <div className={styles.lista}>
                {skills.map((skill)=>
                    <div className={styles.listaContainer}>
                        <div className={styles.listaConteudo}>
                        <div className={styles.imageBox}>
                        <img src={skill.url}/>
                        </div>
                        <div className={styles.nomeBox}>
                        <p>{splitName(skill.nome)}</p>
                        </div>
                        <div className={styles.iconeLixeiraArea}>
                        <FontAwesomeIcon onClick={()=>handleDelete(skill.id)} className={styles.iconeLixeira} icon={faTrash} size='3x'/>
                        </div>
                    </div>
                </div>
                )}
            </div>
                </div>
        </div>
  )
}
