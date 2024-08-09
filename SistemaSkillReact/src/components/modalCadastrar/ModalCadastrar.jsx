import React from 'react'
import styles from './ModalCadastrar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons'
import { nodeName } from 'rsuite/esm/DOMHelper'
import { cadastrarSkill } from '../../service/skill/skill'
import { toast, ToastContainer } from 'react-toastify'
import { ExceptionHook } from '../../Hooks/ExceptionHook'

export const ModalCadastrar = ({close}) => {
  const [arquivo,setArquivo] = React.useState(undefined)
  const [fileSelected, setFileSelected] = React.useState(false)
  const [skill,setSkill] = React.useState({
    nome:"",
    descricao:""
  })
console.log(arquivo);

  const handleChange = (e) =>{
    e.preventDefault()
    const {name,value} = e.target
    setSkill({...skill, [name]:value})
  }
  console.log(skill);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileSelected(true);
    setArquivo(file);
  };

  const handleCadastrar=(e) =>{
    e.preventDefault()
    cadastrarSkill(skill,arquivo)
    .then((res)=>toast.success(`A skill foi cadastrada com sucesso!`))
    .catch((err)=>toast.error(ExceptionHook(err)))
  }

  return (
    <div className={styles.containerModal}>
      <div className={styles.conteudoModal}>
            <div className={styles.header}>
            <h1>Cadastrar Skill</h1>
            <FontAwesomeIcon onClick={close} className={styles.closeIcon} icon={faClose}/>
            </div>
            <div className={styles.conteudo}>
                <form onSubmit={handleCadastrar}>
                  <div className={styles.nomeArea}>
                    <label>Nome da Skill:</label>
                    <input required value={skill.nome} onChange={handleChange} type="text" name="nome" placeholder="Nome da Skill"/>
                    </div>
                    <div className={styles.descricaoArea}>
                    <label>Descrição da skill:</label>
                    <textarea required value={skill.descricao} onChange={handleChange} maxLength='150' name="descricao" placeholder="Descrição da Skill"/>
                    </div>
                    <label for="file-upload" className={` ${fileSelected? styles.customFileUploadSelecionado: styles.customFileUpload}`}>
                      {fileSelected? <FontAwesomeIcon icon={faCheck}/> : 'Enviar Arquivo'}
                    </label>
                    <input required id='file-upload' className={styles.fileInput} type="file" onChange={handleFileChange} accept='image/*'/>
                    <button type='submit'>Cadastrar</button>
                </form>
        </div>
        </div>
        <ToastContainer/>
    </div>
  )
}
