import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { NotificationService } from './notification.service';

@Module({
  imports: [MailerModule], // ✅ Importa para ter acesso ao serviço
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
