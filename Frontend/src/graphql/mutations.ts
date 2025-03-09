import { gql } from '@apollo/client';

export const CREATE_SERVICO = gql`
  mutation CreateServico($descricao: String!, $valor: Float!, $duracao: Float!) {
    createServico(createServicoInput: { descricao: $descricao, valor: $valor, duracao: $duracao }) {
      id
      descricao
      valor
      duracao
    }
  }
`;