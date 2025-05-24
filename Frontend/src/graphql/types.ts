export interface Servico {
  id: number;
  descricao: string;
  valor: number;
  duracao: string;
}

export interface GetServicosData {
  servicos: Servico[];
}

export interface Colaborador {
  id: number;
  descricao: string;
  email: string;
  telemovel: string;
  permissao: {
    id: number;
    descricao: string;
  };
  cargo: {
    id: number;
    descricao: string;
  };
}

export interface Utente {
  id: number;
  nome: string;
  email: string;
  telemovel: string;
  morada: string;
  concelho: string;
  distrito: string;
  pais: string;
  codigo_postal: string;
}

export interface Agendamento {
  id: number;
  id_utente: number;
  id_colaborador: number;
  id_servicos: number[];
  data_agendamento: string;
  hora_inicio: string;
  hora_fim: string;
  statusId: number;
  observacoes: string;
  criado_em: string;
  atualizado_em: string;
}

export interface StatusAgendamento {
  id: number;
  descricao: string;
  cor: string;
}

export interface Cargo {
  id: number;
  descricao: string;
}

export interface Permissao {
  id: number;
  descricao: string;
}
