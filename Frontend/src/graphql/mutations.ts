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

export const LOGIN_COLABORADOR = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;
