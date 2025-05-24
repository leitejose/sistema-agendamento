import { gql } from '@apollo/client';

/* === AUTENTICAÇÃO === */
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

/* === SERVIÇOS === */
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

export const DELETE_SERVICO = gql`
  mutation DeleteServico($id: Int!) {
    removeServico(id: $id) {
      id
    }
  }
`;

/* === AGENDAMENTOS === */
export const CREATE_AGENDAMENTO = gql`
  mutation CreateAgendamento($createAgendamentoInput: CreateAgendamentoInput!) {
    createAgendamento(createAgendamentoInput: $createAgendamentoInput) {
      id
      id_utente
      id_colaborador
      id_servicos
      data_agendamento
      hora_inicio
      hora_fim
      statusId
      observacoes
      criado_em
      atualizado_em
    }
  }
`;

export const UPDATE_AGENDAMENTO = gql`
  mutation UpdateAgendamento($updateAgendamentoInput: UpdateAgendamentoInput!) {
    updateAgendamento(updateAgendamentoInput: $updateAgendamentoInput) {
      id
      id_utente
      data_agendamento
      hora_inicio
      hora_fim
      statusId
      observacoes
    }
  }
`;

export const REMOVE_AGENDAMENTO = gql`
  mutation RemoveAgendamento($id: Int!) {
    removeAgendamento(id: $id) {
      id
    }
  }
`;

export const UPDATE_AGENDAMENTO_STATUS = gql`
  mutation UpdateAgendamentoStatus($id: Int!, $statusId: Int!) {
    updateAgendamento(id: $id, statusId: $statusId) {
      id
      status {
        id
        descricao
        cor
      }
    }
  }
`;

/* === STATUS DO AGENDAMENTO === */
export const CREATE_STATUS_AGENDAMENTO = gql`
  mutation CreateStatusAgendamento($descricao: String!, $cor: String!) {
    createStatusAgendamento(data: { descricao: $descricao, cor: $cor }) {
      id
      descricao
      cor
    }
  }
`;

export const DELETE_STATUS_AGENDAMENTO = gql`
  mutation DeleteStatusAgendamento($id: Int!) {
    removeStatusAgendamento(id: $id) {
      id
    }
  }
`;

/* === COLABORADORES === */
export const CREATE_COLABORADOR = gql`
  mutation CreateColaborador(
    $descricao: String!
    $email: String!
    $telemovel: String!
    $cargoId: Int!
    $permissaoId: Int!
    $senha: String!
  ) {
    createColaborador(
      createColaboradorInput: {
        descricao: $descricao,
        email: $email,
        telemovel: $telemovel,
        cargoId: $cargoId,
        permissaoId: $permissaoId,
        senha: $senha
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

export const DELETE_COLABORADOR = gql`
  mutation DeleteColaborador($id: Int!) {
    removeColaborador(id: $id) {
      id
      descricao
      email
    }
  }
`;

/* === UTENTES === */
export const CREATE_UTENTE = gql`
  mutation CreateUtente($data: CreateUtenteInput!) {
    createUtente(data: $data) {
      id
      nome
      email
    }
  }
`;

export const UPDATE_UTENTE = gql`
  mutation UpdateUtente($id: Int!, $updateUtenteInput: UpdateUtenteInput!) {
    updateUtente(id: $id, updateUtenteInput: $updateUtenteInput) {
      id
      nome
      email
      telemovel
      morada
      concelho
      distrito
      pais
      codigo_postal
    }
  }
`;

export const DELETE_UTENTE = gql`
  mutation RemoveUtente($id: Int!) {
    removeUtente(id: $id) {
      id
    }
  }
`;
