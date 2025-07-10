import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PermissoesModule } from './modules/permissoes/permissoes.module';
import { ServicosModule } from './modules/servicos/servicos.module';
import { CargoModule } from './modules/cargo/cargo.module';
import { CargoService } from './modules/cargo/cargo.service';
import { PrismaModule } from 'prisma/prisma.module';
import { ColaboradoresModule } from './modules/colaboradores/colaborador.module';
import { UtentesModule } from './modules/utentes/utentes.module';
import { LoginModule } from './modules/login/login.module';
import { AuthModule } from './modules/reset/auth.module';
import { AgendamentosModule } from './modules/agendamentos/agendamentos.module';
import { StatusAgendamentoModule } from './modules/status/status.module';
import { FeriasModule } from './modules/ferias/ferias.module';
import { UploadController } from './upload/upload.controller';
import { DisponibilidadesModule } from './modules/disponibilidades/disponibilidades.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    PermissoesModule,
    ServicosModule,
    CargoModule,
    PrismaModule,
    ColaboradoresModule,
    UtentesModule,
    LoginModule,
    AuthModule,
    AgendamentosModule,
    StatusAgendamentoModule,
    FeriasModule,
    DisponibilidadesModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: process.env.EMAIL_FROM,
      },
    }),
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, CargoService],
})
export class AppModule {}
