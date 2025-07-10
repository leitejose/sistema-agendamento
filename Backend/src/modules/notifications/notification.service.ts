import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NotificationTemplates } from './notification.templates';

@Injectable()
export class NotificationService {
  constructor(private readonly mailerService: MailerService) {}

  async sendAgendamentoCriado(email: string, agendamento: any) {
    await this.mailerService.sendMail({
      to: email,
      subject: NotificationTemplates.agendamentoCriado(agendamento).subject,
      html: NotificationTemplates.agendamentoCriado(agendamento).html,
    });
  }

  async sendAgendamentoAlterado(email: string, agendamento: any) {
    const { subject, html } = NotificationTemplates.agendamentoAlterado(agendamento);
    await this.mailerService.sendMail({ to: email, subject, html });
  }

  async sendAgendamentoCancelado(email: string, agendamento: any) {
    const { subject, html } = NotificationTemplates.agendamentoCancelado(agendamento);
    await this.mailerService.sendMail({ to: email, subject, html });
  }

  async sendAgendamentoConcluido(email: string, agendamento: any) {
    const { subject, html } = NotificationTemplates.agendamentoConcluido(agendamento);
    await this.mailerService.sendMail({ to: email, subject, html });
  }
}