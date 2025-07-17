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
      imagem_url 
      cor
      cargo {
        id
        descricao
      }
      disponibilidades {
        id
        dia_da_semana
        hora_inicio
        hora_fim
      }
    }
  }
`;

export const GET_COLABORADORES_MEDICOS = gql`
  query GetColaboradoresMedicos {
    colaboradores(where: { cargo: { descricao: { equals: "Medico" } } }) {
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
      disponibilidades {
        id
        dia_da_semana
        hora_inicio
        hora_fim
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
      nif
      sns
    }
  }
`;

/* === CARGOS E PERMISSÕES === */
export const GET_CARGOS = gql`
  query {
    cargos {
      id
      descricao
      permissoes {
        id
        descricao
      }
    }
  }
`;

export const GET_PERMISSOES = gql`
  query {
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

/* === FÉRIAS === */
export const GET_FERIAS = gql`
  query {
    ferias {
      id
      descricao
      data_inicio
      data_fim
      colaborador_id
    }
  }
`;

/* === COLABORADOR LOGADO === */
export const GET_COLABORADOR_LOGADO = gql`
  query {
    meColaborador {
      id
      descricao
      email
      cargo {
        id
        descricao
      }
      # outros campos se necessário
    }
  }
`;

/* === DISPONIBILIDADES === */
export const GET_DISPONIBILIDADES = gql`
  query {
    disponibilidades {
      id
      id_colaborador
      dia_da_semana
      hora_inicio
      hora_fim
    }
  }
`;

/* === HORÁRIOS DISPONÍVEIS === */
export const GET_HORARIOS_DISPONIVEIS = gql`
  query HorariosDisponiveis($id_colaborador: Int!, $data: String!) {
    horariosDisponiveis(id_colaborador: $id_colaborador, data: $data) {
      horarios
      mensagem
    }
  }
`;
