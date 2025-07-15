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
      id_colaborador
      id_servicos
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
    $senha: String!
    $imagem_url: String
    $cor: String!
  ) {
    createColaborador(
      createColaboradorInput: {
        descricao: $descricao,
        email: $email,
        telemovel: $telemovel,
        cargoId: $cargoId,
        senha: $senha,
        imagem_url: $imagem_url,
        cor: $cor
      }
    ) {
      id
      descricao
      email
      telemovel
      imagem_url
      cor
      cargo {
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
    $cargoId: Int!,
    $imagem_url: String,
    $cor: String!
  ) {
    updateColaborador(
      id: $id,
      updateColaboradorInput: {
        descricao: $descricao,
        email: $email,
        telemovel: $telemovel,
        cargoId: $cargoId,
        imagem_url: $imagem_url,
        cor: $cor
      }
    ) {
      id
      descricao
      email
      telemovel
      imagem_url
      cor
      cargo {
        id
        descricao
      }
    }
  }
`;
export const UPLOAD_IMAGEM_COLABORADOR = gql`
  mutation UploadImagemColaborador($file: Upload!, $colaboradorId: Int!) {
    uploadImagemColaborador(file: $file, colaboradorId: $colaboradorId) {
      id
      imagem_url
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

export const CREATE_FERIAS = gql`
  mutation CreateFerias($data: CreateFeriasInput!) {
    createFerias(data: $data) {
      id
      descricao
      data_inicio
      data_fim
      colaborador_id
    }
  }
`;

export const REMOVE_FERIAS = gql`
  mutation RemoveFerias($id: Int!) {
    removeFerias(id: $id) {
      id
    }
  }
`;

export const UPDATE_FERIAS = gql`
  mutation UpdateFerias($data: UpdateFeriasInput!) {
    updateFerias(data: $data) {
      id
      descricao
      data_inicio
      data_fim
      colaborador_id
    }
  }
`;

export const CREATE_PERMISSAO = gql`
  mutation CreatePermissao($createPermissoesInput: CreatePermissoesInput!) {
    createPermissoes(createPermissoesInput: $createPermissoesInput) {
      id
      descricao
    }
  }
`;

export const REMOVE_PERMISSAO = gql`
  mutation RemovePermissao($id: Int!) {
    removePermissoes(id: $id) {
      id
    }
  }
`;

export const UPDATE_PERMISSAO = gql`
  mutation UpdatePermissao($id: Int!, $updatePermissoesInput: UpdatePermissoesInput!) {
    updatePermissoes(id: $id, updatePermissoesInput: $updatePermissoesInput) {
      id
      descricao
    }
  }
`;

export const CREATE_CARGO = gql`
  mutation CreateCargo($createCargoInput: CreateCargoInput!) {
    createCargo(createCargoInput: $createCargoInput) {
      id
      descricao
      permissoes { id descricao }
    }
  }
`;

export const UPDATE_CARGO = gql`
  mutation UpdateCargo($id: Int!, $updateCargoInput: UpdateCargoInput!) {
    updateCargo(id: $id, updateCargoInput: $updateCargoInput) {
      id
      descricao
      permissoes { id descricao }
    }
  }
`;

export const REMOVE_CARGO = gql`
  mutation RemoveCargo($id: Int!) {
    removeCargo(id: $id) { id }
  }
`;
export const CREATE_DISPONIBILIDADE = gql`
  mutation CreateDisponibilidade($data: [CreateDisponibilidadeInput!]!) {
    createDisponibilidades(data: $data) {
      id
      id_colaborador
      dia_da_semana
      hora_inicio
      hora_fim
    }
  }
`;
export const UPDATE_DISPONIBILIDADE = gql`
  mutation UpdateDisponibilidade($updateDisponibilidadeInput: UpdateDisponibilidadeInput!) {
    updateDisponibilidade(updateDisponibilidadeInput: $updateDisponibilidadeInput) {
      id
      id_colaborador
      dia_da_semana
      hora_inicio
      hora_fim
    }
  }
`;
export const DELETE_DISPONIBILIDADE = gql`
  mutation DeleteDisponibilidade($id: Int!) {
    removeDisponibilidade(id: $id) {
      id
    }
  }
`;
