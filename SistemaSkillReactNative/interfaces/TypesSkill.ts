import { skillLevelType } from "../components/ModalAtribuir/ModalAtribuir";

export interface SkillType{
    id: number;
    nome: string;
    descricao:string;
    url:string;
}

export interface CardSkillProps {
    skill: skillLevelType;
    handleAtualizar: (skill: number, novoNivel: number) => Promise<void>
    handleDeletar: (idSelecionado: number) => Promise<void>
  }

export interface skillUserType{
    nivel: number;
    skill: SkillType;
}