import { View, Text, StyleSheet, ToastAndroid, ScrollView } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import React, { useContext, useEffect, useState } from 'react'
import useFetchUser from '../../hooks/userHooks';
import { AuthContext } from '../../context/authContext';
import { listarTodasSkills } from '../../service/skill/skill';
import { SkillType, skillUserType } from '../../interfaces/TypesSkill';
import { atribuirSkill } from '../../service/usuario/usuario';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UsuarioType } from '../../interfaces/TypesUsuario';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faList, faLongArrowAltUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { styles, pickerSelectStyles } from './ModalAtribuirStyle';

interface modalAtribuirProps{
    reload: (skills: any) => void,
    userId:number,
    close:() => void,
}

export interface skillLevelType{
    nivel:number,
    skill: SkillType
}

export default function ModalAtribuir({reload, userId, close}: modalAtribuirProps) {
    const [selectedValue, setSelectedValue] = useState(null);
    const [teste,setTeste] = useState([])
    const {user} = useContext(AuthContext)
    const fetchUser = useFetchUser()
    const [skillsDisponiveis, setSkillsDisponiveis] = React.useState([])
    const [skillsAtribuidas, setSkillsAtribuidas] = useState<skillUserType[]>([]);
    const [novosObjetos, setNovosObjetos] = useState([])

    console.log(selectedValue);
    useEffect(() => {
        listarTodasSkills().then((res) => {
            console.log("Skills iniciais: ", user.skills);
            
            const novaLista = res.data.filter((skillRes: SkillType) =>
                !user.skills.some((skillUser: skillUserType) => skillUser.skill.id === skillRes.id)
            );
    
            
            const novos = novaLista.map((element: SkillType) => ({
                label: element.nome,
                value: element.id
            }));
    
            setSkillsDisponiveis(novaLista);
            setNovosObjetos(novos); 
        }).catch((err) => ToastAndroid.showWithGravity(err?.response?.data?.titulo, ToastAndroid.TOP, ToastAndroid.SHORT));
    }, [user.skills]);

    const handleSubstring = (selecionada:skillLevelType) =>{
        const nome =selecionada.skill.nome
        return nome.length > 18 ? `${nome.substring(0, 18)}...` : nome
      }

      const handleRemoverSkill = (id:number) =>{
        const novaLista = skillsAtribuidas.filter(skill => skill.skill.id !== id)
        setSkillsAtribuidas(novaLista)
        return ToastAndroid.showWithGravity('Skill Removida da lista com sucesso!', ToastAndroid.TOP, ToastAndroid.SHORT)
    }

      const handleNivel = (
        selecionada: skillLevelType,
        acao: 'adicionar' | 'remover'
    ) => {
        let novoNivel = selecionada.nivel;
    
        if (acao === 'adicionar') {
            novoNivel = novoNivel < 10 ? novoNivel + 1 : novoNivel;
        } else if (acao === 'remover') {
            novoNivel = novoNivel > 0 ? novoNivel - 1 : novoNivel;
        }
    
        setSkillsAtribuidas((prevSkills) =>
            prevSkills.map((skill) =>
                skill.skill.id === selecionada.skill.id
                    ? { ...skill, nivel: novoNivel }
                    : skill
            )
        );
    };

    const handleChange = (value: any) => {
        const skillSelecionada: skillUserType = {
            skill: skillsDisponiveis.find((skill: SkillType) => skill.id === value) || null,
            nivel: 0,
        };
    
        if (skillSelecionada.skill && !skillsAtribuidas.some((skill: skillUserType) => skill.skill.id === skillSelecionada.skill.id)) {
            setSkillsAtribuidas([...skillsAtribuidas, skillSelecionada]);
            ToastAndroid.showWithGravity(`${skillSelecionada.skill.nome} adicionada com sucesso!`, ToastAndroid.TOP, ToastAndroid.SHORT);
        } else {
            ToastAndroid.showWithGravity('Skill já atribuída ou inválida', ToastAndroid.TOP, ToastAndroid.SHORT);
        }
    };
      console.log(skillsDisponiveis);
      console.log(novosObjetos);
      console.log('atribuidas:',skillsAtribuidas);
      
      const handleSalvar =  () =>{
        const skillsSalvar:any = [];
        const niveis:any = [];
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
        .catch((err)=>ToastAndroid.showWithGravity(err?.response?.data?.titulo, ToastAndroid.TOP, ToastAndroid.SHORT))
        ToastAndroid.showWithGravity('Skills atribuidas com sucesso!',ToastAndroid.TOP, ToastAndroid.SHORT)
        console.log("Skills 'novas'", user.skills);
        setSkillsAtribuidas([])      
        setSelectedValue(null)
      }
      
    return (
    <View  style={styles.container}>
        <View style={styles.conteudoModal}>
        <RNPickerSelect
        onValueChange={handleChange}
        items={novosObjetos}
        placeholder={{ label: 'Selecione uma skill', value: null }}
        style={pickerSelectStyles}
        value={selectedValue}
      />
      <View style={styles.viewArea}>
          <ScrollView>
      {skillsAtribuidas.map((skill:skillLevelType)=>
      <View style={styles.configurar}>
        <View style={styles.nomeArea}>
        <FontAwesomeIcon size={15} style={styles.iconeNome} icon={faList}/>
        <Text style={{color:"white",fontSize:17}}>{handleSubstring(skill)}</Text>
        </View>
        <View style={styles.nivelArea}>
        <FontAwesomeIcon size={30}  style={{color:"white"}} icon={faLongArrowAltUp}/>
        <TouchableOpacity onPress={()=>handleNivel(skill,'adicionar')}>
            <Text style={{color:"white",fontSize:25}}>+</Text>
        </TouchableOpacity>
        <Text style={{color:"white",fontSize:23}}>{skill.nivel}</Text>
        <TouchableOpacity style={styles.botaoDiminuir} onPress={()=>handleNivel(skill,"remover")}>
            <Text style={{color:"white",fontSize:25}}>-</Text>
        </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={()=>handleRemoverSkill(skill.skill.id)}>
        <FontAwesomeIcon size={25} color='white' icon={faTrash}/>
        </TouchableOpacity>
        </View>
        </View>
      )}
      </ScrollView>
      </View >
        <View style={styles.buttonArea}>
      <TouchableOpacity onPress={handleSalvar} style={styles.botaoAtribuir}>
        <Text style={{color:'white'}}>Atribuir skills</Text>
      </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

