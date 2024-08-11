import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../../context/authContext';
import CardSkill from '../../components/CardSkill/CardSkill';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { atualizarNivel, removerSkill } from '../../service/usuario/usuario';
import { ToastAndroid } from 'react-native';
// import ModalCadastrar from '../../components/ModalCadastrar/ModalCadastrar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetchUser from '../../hooks/userHooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import ModalAtribuir from '../../components/ModalAtribuir/ModalAtribuir';

const HomePage: React.FC = () => {
  const navigation = useNavigation();
  const fetchUser = useFetchUser()
  const { user, salvarUser } = useContext(AuthContext);
  const [modalAtribuir, setModalAtribuir] = useState(false);
  const [modalCadastrar, setModalCadastrar] = useState(false);
  const [skills, setSkills] = useState(user ? user.skills : []);
  const [dropdownAtribuir, setDropdownAtribuir] = useState(false);
  const [dropdownSkill, setDropdownSkill] = useState(false);

  useEffect(() => {
    setSkills(user.skills);
  }, [user]);

  const handleLogout = () => {
    // Remover dados do AsyncStorage
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  const handleDeleteSkill = async (idSelecionado: number) => {
    const info = {
      usuarioId: user.id,
      skillId: idSelecionado,
    };
    try {
      const res = await removerSkill(info);
      salvarUser(res.data);
      setSkills(res.data.skills);
      ToastAndroid.show('Skill removida com sucesso', ToastAndroid.SHORT);
    } catch (err) {
      ToastAndroid.show('Falha ao remover a skill', ToastAndroid.SHORT);
    }
  };

  const handleAtualizarNivel = async (skill: number, novoNivel: number) => {
    const info = {
      usuarioId: user.id,
      skillId: skill,
      nivel: novoNivel,
    };
    try {
      await atualizarNivel(info).then((res)=>fetchUser(user.id));
    } catch (err) {
      ToastAndroid.show('Erro ao atualizar o nível da Skill', ToastAndroid.SHORT);
    }
  };

  const reloadSkills = (skills: any) => {
    setSkills(skills);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bemVindo}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Bem-vindo, {user.email.split('@gmail.com')}!</Text>
          <TouchableOpacity onPress={handleLogout}>
          <FontAwesomeIcon
            
            icon={faDoorOpen}
            size={24}
            style={styles.icon}
          />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={()=> setDropdownSkill(!dropdownAtribuir)}>
            <Text style={styles.TextButton}>Cadastrar Skill</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=> setModalAtribuir(!modalAtribuir)}>
            <Text style={styles.TextButton}>Atribuir Skill</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.contentArea}>
        {skills.map((skill: any) => (
          <CardSkill
            key={skill.id}
            skill={skill}
            handleAtualizar={handleAtualizarNivel}
            handleDeletar={handleDeleteSkill}
          />
        ))}
        {skills.length <= 0 && (
          <Text style={styles.renderError} onPress={() => setModalAtribuir(true)}>
            Nada por aqui... Tente atribuir uma skill!
          </Text>
        )}
      </ScrollView>
      {modalAtribuir && (
        <ModalAtribuir reload={reloadSkills} userId={user.id} close={() => setModalAtribuir(false)} />
      )}
      {/* {modalCadastrar && (
        <ModalCadastrar reload={reloadSkills} userId={user.id} close={() => setModalCadastrar(false)} />
      )} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707ed',
    padding: 16,
  },
  bemVindo: {
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 20,
  },
  icon: {
    color: '#fff',
  },
  contentArea: {
    flex: 1,
  },
  renderError: {
    textAlign: 'center',
    color: '#ccc',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  buttonArea:{
    flexDirection: 'row',
    marginTop:10,
    gap:140,
  },
  TextButton:{
    color: '#fff',
    fontSize: 16,
  },
  button:{
    backgroundColor: '#60d4ea',
    padding:5,
    borderWidth:3,
    borderColor:'#27c3e2f8',
    borderRadius:23,
  }
});

export default HomePage;
