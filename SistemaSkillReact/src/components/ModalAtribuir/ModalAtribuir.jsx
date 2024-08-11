import { toast, ToastContainer } from 'react-toastify'
import { listarTodasSkills } from '../../service/skill/skill'

import styles from './ModalAtribuir.module.css'

import React, { useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faLevelUp, faList, faLongArrowAltUp, faTrash } from '@fortawesome/free-solid-svg-icons'
import { atribuirSkill } from '../../service/usuario/usuario'
import { AuthContext } from '../../contexts/authContext'
import useFetchUser from '../../Hooks/UserHooks'
import { ExceptionHook } from '../../Hooks/ExceptionHook'

export const ModalAtribuir = ({close,userId,reload}) => {
  const {user} = useContext(AuthContext)
  const fetchUser = useFetchUser()
  const [skillsDisponiveis, setSkillsDisponiveis] = React.useState([])
  const [skillsAtribuidas, setSkillsAtribuidas] = React.useState([])
  const [buttonState, setButtonState] = React.useState(true)


    const handleRemoverSkill = (id) =>{
        const novaLista = skillsAtribuidas.filter(skill => skill.skill.id !== id)
        setSkillsAtribuidas(novaLista)
        return toast.success('Skill Removida da lista com sucesso!')
    }

  useEffect(()=>{
    skillsAtribuidas.length > 0 ? setButtonState(false) : setButtonState(true)
  },[skillsAtribuidas])

    const handleNivel = (e, selecionada, acao) => {
        const { value } = e.target;
    
        let novoNivel = selecionada.nivel;
    
        if (acao === 'adicionar') {
          novoNivel = novoNivel < 10 ? novoNivel + 1 : novoNivel;
        } else if (acao === 'remover') {
          novoNivel = novoNivel > 0 ? novoNivel - 1 : novoNivel;
        }
    
        selecionada.nivel = novoNivel;
        setSkillsAtribuidas([...skillsAtribuidas]);
      };

      const handleChange = (e) => {
        const value = e.target.value;
        const skillSelecionada = {
          skill: skillsDisponiveis.find((skill) => skill.id == value),
          nivel: 0,
        };
    
        if (skillSelecionada.skill && !skillsAtribuidas.some((skill) => skill.skill.id === skillSelecionada.skill.id)) {
          setSkillsAtribuidas([...skillsAtribuidas, skillSelecionada]);
          toast.success(`${skillSelecionada.skill.nome} adicionada com sucesso!`);
        } else {
          toast.error('Skill já atribuída ou inválida');
        }
      };

      const handleSubstring = (selecionada) =>{
        const nome =selecionada.skill.nome
        return nome.length > 37 ? `${nome.substring(0, 37)}...` : nome
      }

      const handleSalvar =  () =>{
        const skillsSalvar = [];
        const niveis = [];
        skillsAtribuidas.forEach((skill)=>{
            skillsSalvar.push(skill.skill.id)
            niveis.push(skill.nivel)
        })

        const info = {
            usuarioId: userId,
            skillsId:skillsSalvar,
            niveis:niveis
        }
        atribuirSkill(info).then((res)=>fetchUser(userId))
        .catch((err)=>toast.error(ExceptionHook(err)))
        toast.success('Skills atribuidas com sucesso!')
        console.log("Skills 'novas'", user.skills);
        setSkillsAtribuidas([])
        reload(user.skills)        
      }

      useEffect(() => {
        listarTodasSkills().then((res) => {
          
          console.log("Skills iniciais: ",user.skills);
          console.log(res.data);
          
          const novaLista = res.data.filter((skillRes) =>
            !user.skills.some((skillUser) => skillUser.skill.id === skillRes.id)
          );
          
          setSkillsDisponiveis(novaLista);
        });
      }, [user.skills]);

    return (
    <div  className={styles.containerModal}>
      <div className={styles.conteudoModal}>
        <div className={styles.conteudo}>
          <div className={styles.header}>
        <select  onChange={handleChange}>
            <option selected disabled>Selecione uma skill</option>
            {skillsDisponiveis.map((skill)=>
            <option id={skill.id} value={skill.id} >{skill.nome}</option>
            )}
        </select>
        <FontAwesomeIcon onClick={close} className={styles.closeIcon} icon={faClose}/>
        </div>
        <div className={styles.showList}>
        {skillsAtribuidas.map((selecionada)=>
          
            <div className={styles.configurar}>
                    <div className={styles.nomeArea}>
                    <FontAwesomeIcon className={styles.iconeLista} icon={faList}/>
                      {handleSubstring(selecionada)}
                      </div>
                    <div className={styles.nivelArea}>
                    <span >
                      
                      <button onClick={(e) => handleNivel(e, selecionada, 'adicionar')}>+</button>
                      {selecionada.nivel}
                      <button onClick={(e) => handleNivel(e, selecionada, 'remover')}>-</button>
                    </span>
                    </div>
                    <div className={styles.botaoRemover}>
                        <FontAwesomeIcon style={{cursor:'pointer'}} onClick={()=>handleRemoverSkill(selecionada.skill.id)} icon={faTrash}/>
                    </div>
             </div>
        )}
            <div className={styles.buttonArea}>
            <button onClick={handleSalvar} disabled={buttonState} type='button'>Atribuir skills</button>
            </div>
            </div>
        </div>
        </div>
        <ToastContainer/>
    </div>
  )
}
