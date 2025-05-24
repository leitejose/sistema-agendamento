import { gql } from '@apollo/client';

/* === SERVIÇOS === */
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

/* === AGENDAMENTOS === */
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
      statusId
      observacoes
    }
  }
`;

/* === COLABORADORES === */
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

/* === UTENTES === */
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

/* === CARGOS E PERMISSÕES === */
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

/* === STATUS DE AGENDAMENTO === */
export const GET_STATUS = gql`
  query GetStatus {
    statusAgendamentos {
      id
      descricao
      cor
    }
  }
`;
