import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { CardSkillProps } from '../../interfaces/TypesSkill';
import { styles, modalStyle } from './CardSkillStyles';

export default function CardSkill({
  skill,
  handleAtualizar,
  handleDeletar,
}: CardSkillProps) {
  const [novaUrl, setNovaUrl] = useState('inicial');
  const [nivel, setNivel] = useState(skill.nivel);
  const [modalOpcoes, setModalOpcoes] = useState(false);

  const handleNivel = (operacao: string) => {
    if (operacao === 'somar') {
      setNivel(nivel < 10 ? nivel + 1 : 10);
    }
    if (operacao === 'subtrair') {
      setNivel(nivel > 0 ? nivel - 1 : 0);
    }
  };
  useEffect(() => {
    setNivel(skill.nivel);
  }, [skill.nivel]);

  useEffect(() => {
    const url = skill.skill.url.split('/');
    setNovaUrl(`http://192.168.1.10:8080/${url[3]}/${url[4]}/${url[5]}`);
  }, [skill.skill.url]);

  return (
    <TouchableOpacity
      onPress={() => setModalOpcoes(!modalOpcoes)}
      style={styles.container}
    >
      <View style={styles.conteudo}>
        <Image style={styles.imagem} source={{ uri: novaUrl }} />
        <View style={styles.info}>
          <Text style={styles.titulo}>{skill.skill.nome}</Text>
          <View style={styles.descricao}>
            <Text style={styles.descricaoText}>{skill.skill.descricao}</Text>
          </View>
          <View style={styles.nivelArea}>
            <Text style={styles.nivelLabel}>Nível:</Text>
            <View style={styles.buttonNivelArea}>
              <TouchableOpacity onPress={() => handleNivel('somar')} style={styles.buttonArea}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
              <Text style={styles.nivel}>{nivel}</Text>
              <TouchableOpacity onPress={() => handleNivel('subtrair')} style={styles.buttonArea}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {modalOpcoes && (
        <View style={modalStyle.container}>
          <View style={modalStyle.opcoes}>
            <TouchableOpacity onPress={()=>handleDeletar(skill.skill.id)} style={modalStyle.button}>
              <Text style={modalStyle.buttonText}>Remover Skill</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleAtualizar(skill.skill.id,nivel)} style={modalStyle.button}>
              <Text style={modalStyle.buttonText}>Salvar Nível</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

