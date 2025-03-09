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