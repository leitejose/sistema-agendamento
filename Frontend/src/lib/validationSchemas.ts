import { z } from 'zod';

// Validation schema for Utentes
export const utenteSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  telemovel: z.string().regex(/^\d{9}$/, 'Telemóvel deve ter 9 dígitos'),
  morada: z.string().optional(),
  concelho: z.string().optional(),
  distrito: z.string().optional(),
  pais: z.string().optional(),
  codigo_postal: z.string().regex(/^\d{4}-\d{3}$/, 'Código postal inválido').optional(),
  nif: z.string().regex(/^\d{9}$/, 'NIF deve ter 9 dígitos'),
  sns: z.string().regex(/^\d{9}$/, 'SNS deve ter 9 dígitos').optional(),
});

// Validation schema for Agendamentos
export const agendamentoSchema = z.object({
  id_utente: z.number().int().positive('ID do utente inválido'),
  id_colaborador: z.number().int().positive('ID do colaborador inválido'),
  id_servicos: z.number().int().positive('ID do serviço inválido'),
  data_agendamento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida'),
  hora_inicio: z.string().regex(/^\d{2}:\d{2}$/, 'Hora de início inválida'),
  hora_fim: z.string().regex(/^\d{2}:\d{2}$/, 'Hora de fim inválida'),
  statusId: z.number().int().optional(),
  observacoes: z.string().optional(),
});

// Validation schema for Colaboradores
export const colaboradorSchema = z.object({
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  email: z.string().email('Email inválido'),
  telemovel: z.string().regex(/^\d{9}$/, 'Telemóvel deve ter 9 dígitos'),
  imagem_url: z.string().url('URL da imagem inválida').optional(),
  cor: z.string().optional(),
  senha: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/\d/, 'Senha deve conter pelo menos um número')
    .regex(/[@$!%*?&#]/, 'Senha deve conter pelo menos um caractere especial'),
});
