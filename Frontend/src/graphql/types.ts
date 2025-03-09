export interface Servico {
  id: number;
  descricao: string;
  valor: number;
  duracao: string;
}

export interface GetServicosData {
  servicos: Servico[];
}