import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert, Image, ToastAndroid } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as ImagePicker from 'expo-image-picker';
// import { cadastrarSkill } from '../../service/skill/skill';
import { styles } from './ModalCadastrarStyle';

interface Skill {
  nome: string;
  descricao: string;
}

interface ModalCadastrarProps {
  close: () => void;
  reload: (skills: any) => void;
  userId: number;
}

export const ModalCadastrar: React.FC<ModalCadastrarProps> = ({ close, reload, userId }) => {
  const [arquivo, setArquivo] = useState<ImagePicker.ImagePickerResult | null>(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [skill, setSkill] = useState<Skill>({ nome: '', descricao: '' });

  const handleChange = (name: keyof Skill, value: string) => {
    setSkill((prevSkill) => ({ ...prevSkill, [name]: value }));
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Necessária', 'Precisamos de permissão para acessar a galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setArquivo(result);
      setFileSelected(true);
    }
  };

  const handleCadastrar = async () => {
    try {
      // console.log(arquivo);
      
      if (!skill.nome || !skill.descricao || !arquivo) {
        Alert.alert('Erro', 'Preencha todos os campos.');
        return;
      }
      await cadastrarSkill(skill, arquivo); 
      ToastAndroid.showWithGravity('A skill foi cadastrada com sucesso!', ToastAndroid.TOP, ToastAndroid.SHORT);
      close();
    } catch (err) {
      if (err?.response?.data) {
        ToastAndroid.showWithGravity(err.response.data.titulo, ToastAndroid.TOP, ToastAndroid.SHORT);
      } else {
        ToastAndroid.showWithGravity('Erro desconhecido', ToastAndroid.TOP, ToastAndroid.SHORT);
      }
    }
  };

  return (
    <Modal transparent visible={true} onRequestClose={close}>
      <View style={styles.containerModal}>
        <View style={styles.conteudoModal}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Cadastrar Skill</Text>
            <TouchableOpacity onPress={close} style={styles.closeIcon}>
              <FontAwesomeIcon icon={faTimes} size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.conteudo}>
            <TextInput
              style={styles.input}
              placeholder="Nome da Skill"
              placeholderTextColor="#fff"
              value={skill.nome}
              onChangeText={(text) => handleChange('nome', text)}
            />
            <TextInput
              style={styles.textarea}
              placeholder="Descrição da Skill"
              placeholderTextColor="#fff"
              multiline
              numberOfLines={4}
              value={skill.descricao}
              onChangeText={(text) => handleChange('descricao', text)}
            />
            <TouchableOpacity
              style={fileSelected ? styles.fileButtonSelected : styles.fileButton}
              onPress={handleImagePick}
            >
              <FontAwesomeIcon icon={fileSelected ? faCheck : faTimes} size={15} color={fileSelected ? "#0bff03" : "#ccc"} />
              <Text style={styles.fileButtonText}>
                {fileSelected ? 'Arquivo Selecionado' : 'Enviar Arquivo'}
              </Text>
            </TouchableOpacity>
            {arquivo && arquivo.assets && arquivo.assets.length > 0 && (
              <Image source={{ uri: arquivo.assets[0].uri }} style={styles.previewImage} />
            )}
            <TouchableOpacity style={styles.submitButton} onPress={handleCadastrar}>
              <Text style={styles.submitButtonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

