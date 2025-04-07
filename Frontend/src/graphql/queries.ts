import { gql } from '@apollo/client';

export const GET_SERVICOS = gql`
  query GetServicos {
    servicos {
      id
      descricao
      valor
      duracao
    }
  }
`;

export const DELETE_SERVICO = gql`
  mutation DeleteServico($id: Int!) {
    removeServico(id: $id) {
      id
    }
  }
`;

export const UPDATE_SERVICO = gql`
  mutation UpdateServico($id: Int!, $descricao: String!, $valor: Float!, $duracao: Float!) {
    updateServico(id: $id, updateServicoInput: { descricao: $descricao, valor: $valor, duracao: $duracao }) {
      id
      descricao
      valor
      duracao
    }
  }
`;

export const GET_COLABORADORES = gql`
  query GetColaboradores {
    colaboradores {
      id
      email
      id_permissao
      senha
      telemovel
      id_cargo
      descricao
    }
  }
`;

export const DELETE_COLABORADOR = gql`
  mutation DeleteColaborador($id: ID!) {
    removeColaborador(id: $id) {
      id
    }
  }
`;

export const UPDATE_COLABORADOR = gql`
  mutation UpdateColaborador($id: ID!, $email: String!, $id_permissao: Int!, $senha: String!, $telemovel: String!, $id_cargo: Int!, $descricao: String!) {
    updateColaborador(id: $id, email: $email, id_permissao: $id_permissao, senha: $senha, telemovel: $telemovel, id_cargo: $id_cargo, descricao: $descricao) {
      id
      email
      id_permissao
      senha
      telemovel
      id_cargo
      descricao
    }
  }
`;