import { toast, ToastContainer } from 'react-toastify'
import { listarTodasSkills } from '../../service/skill/skill'

import styles from './ModalAtribuir.module.css'

import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { atribuirSkill } from '../../service/usuario/usuario'
import { fetchUser } from '../../Hooks/UserHooks'

export const ModalAtribuir = ({close,userId}) => {

  const [skillsDisponiveis, setSkillsDisponiveis] = React.useState([])
  const [skillsAtribuidas, setSkillsAtribuidas] = React.useState([])


    const handleRemoverSkill = (id) =>{
        const novaLista = skillsAtribuidas.filter(skill => skill.skill.id !== id)
        setSkillsAtribuidas(novaLista)
        return toast.success('Skill Removida da lista com sucesso!')
    }

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

      const handleSalvar =  () =>{
        const skillsSalvar = [];
        const niveis = [];
        skillsAtribuidas.forEach((skill)=>{
            skillsSalvar.push(skill.skill.id)
            niveis.push(skill.nivel)
        })
        console.log('log atribuidas: ',skillsAtribuidas);
        

        const info = {
            usuarioId: userId,
            skillsId:skillsSalvar,
            niveis:niveis
        }
        atribuirSkill(info).then((res)=>fetchUser(userId)).catch((err)=>toast.error('Ocorreu um erro ao salvar as skills!'))
        toast.success('Skills atribuidas com sucesso!')
        close()
      }

  useEffect(()=>{
    listarTodasSkills().then((res)=>setSkillsDisponiveis(res.data))
  },[])
    return (
    <div  className={styles.container}>
        <div className={styles.conteudo}>
        <select  multiple onChange={handleChange}>
            <option disabled>Selecione uma skill</option>
            {skillsDisponiveis.map((skill)=>
            <option id={skill.id} value={skill.id} >{skill.nome}</option>
            )}
        </select>
        <div className={styles.showList}>
        {skillsAtribuidas.map((selecionada)=>
            <div className={styles.configurar}>
             <table>
                <tr>
                    <td>{selecionada.skill.nome}</td>
                    <td>
                    <span>
                      <button onClick={(e) => handleNivel(e, selecionada, 'adicionar')}>+</button>
                      {selecionada.nivel}
                      <button onClick={(e) => handleNivel(e, selecionada, 'remover')}>-</button>
                    </span>
                    </td>
                    <td>
                        <FontAwesomeIcon onClick={()=>handleRemoverSkill(selecionada.skill.id)} icon={faTrash}/>
                    </td>
                </tr>
             </table>
             </div>
        )}
            </div>
            <div className={styles.buttonArea}>
            <button onClick={handleSalvar} type='button'>Atribuir skills</button>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}
