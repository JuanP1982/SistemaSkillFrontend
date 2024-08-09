import * as React from 'react';
import styles from './CardSkill.module.css'
import { atualizarNivel } from '../../service/usuario/usuario';


export default function Card({props, handleDeletar, handleAtualizar}) {
    const [nivel, setNivel] = React.useState(props.nivel)
    console.log(props.skill);
    const nomeSkill = props.skill.nome
    const novoNome =  nomeSkill.length > 37 ? `${nomeSkill.substring(0, 37)}...` : nomeSkill;

    const removerSkill = () =>{
        handleDeletar(props.skill.id)
    }
    console.log(nivel);
    
    const handleUpdateNivel = () =>{
      handleAtualizar(props.skill.id,nivel)
    }
  return (
    <div className={styles.container}>
        <div className={styles.contentArea}>
            <div className={styles.imgArea}>
        <img src={props.skill.url}/>
        </div>
        <p className={styles.title}>{novoNome}</p>
        <div className={styles.nivel}>
        <p>Nivel: 
          <input onChange={(e)=>setNivel(e.target.value)} max='10' min='0' type='number' defaultValue={nivel}/>
          </p>
        
        </div>
        <p className={styles.descricao}>{props.skill.descricao}</p>
        <div className={styles.buttonArea}>
        <button type='button' onClick={removerSkill}>Remover Skill</button>
        <button onClick={handleUpdateNivel} disabled={nivel != props.nivel? false:true}>Atualizar Nível</button>
        </div>
        </div>
    </div>
  );
}


