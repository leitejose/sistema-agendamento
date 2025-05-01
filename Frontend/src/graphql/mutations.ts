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

export const GET_AGENDAMENTOS = gql`
  query GetAgendamentos {
    getAgendamentos {
      id
      id_utente
      id_colaborador
      id_servicos
      data_agendamento
      hora_inicio
      hora_fim
      status
      observacoes
    }
  }
`;

export const CREATE_AGENDAMENTO = gql`
  mutation CreateAgendamento(
    $clienteId: Int!
    $funcionarioId: Int!
    $servicoId: Int!
    $dataAgendamento: DateTime!
    $horaInicio: DateTime!
    $horaFim: DateTime
    $status: String!
    $observacoes: String
  ) {
    createAgendamento(
      clienteId: $clienteId
      funcionarioId: $funcionarioId
      servicoId: $servicoId
      dataAgendamento: $dataAgendamento
      horaInicio: $horaInicio
      horaFim: $horaFim
      status: $status
      observacoes: $observacoes
    ) {
      id
      clienteId
      funcionarioId
      servicoId
      dataAgendamento
      horaInicio
      horaFim
      status
      observacoes
    }
  }
`;

export const UPDATE_AGENDAMENTO = gql`
  mutation UpdateAgendamento(
    $id: Int!
    $clienteId: Int!
    $funcionarioId: Int!
    $servicoId: Int!
    $dataAgendamento: DateTime!
    $horaInicio: DateTime!
    $horaFim: DateTime
    $status: String!
    $observacoes: String
  ) {
    updateAgendamento(
      id: $id
      clienteId: $clienteId
      funcionarioId: $funcionarioId
      servicoId: $servicoId
      dataAgendamento: $dataAgendamento
      horaInicio: $horaInicio
      horaFim: $horaFim
      status: $status
      observacoes: $observacoes
    ) {
      id
      clienteId
      funcionarioId
      servicoId
      dataAgendamento
      horaInicio
      horaFim
      status
      observacoes
    }
  }
`;

export const DELETE_AGENDAMENTO = gql`
  mutation DeleteAgendamento($id: Int!) {
    deleteAgendamento(id: $id) {
      id
    }
  }
`;

export const UPDATE_COLABORADOR = gql`
  mutation UpdateColaborador(
    $id: Int!,
    $descricao: String!,
    $email: String!,
    $telemovel: String!,
    $id_cargo: Int!,
    $id_permissao: Int!
  ) {
    updateColaborador(
      id: $id,
      updateColaboradorInput: {
        descricao: $descricao,
        email: $email,
        telemovel: $telemovel,
        id_cargo: $id_cargo,
        id_permissao: $id_permissao
      }
    ) {
      id
      descricao
      email
      telemovel
      cargo {
        id
        descricao
      }
      permissao {
        id
        descricao
      }
    }
  }
`;
