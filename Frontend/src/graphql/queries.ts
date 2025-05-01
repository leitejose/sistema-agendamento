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
      descricao
      email
      telemovel
      permissao {
        id
        descricao
      }
      cargo {
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

export const UPDATE_COLABORADOR = gql`
  mutation UpdateColaborador(
    $id: ID!,
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

export const GET_UTENTES = gql`
  query GetUtentes {
    utentes {
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
    removeUtente(id: $id)
    {
      id
      
    }
  }
`;

export const GET_CARGOS = gql`
  query GetCargos {
    cargos {
      id
      descricao
    }
  }
`;

export const GET_PERMISSOES = gql`
  query GetPermissoes {
    permissoes {
      id
      descricao
    }
  }
`;