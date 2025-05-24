import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { AuthModule } from './modules/auth/auth.module';
import { AgendamentosModule } from './modules/agendamentos/agendamentos.module';
import { StatusAgendamentoModule } from './modules/status/status.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'joseclevina',
      database: 'appointments_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
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
  ],
  controllers: [AppController],
  providers: [AppService, CargoService],
})
export class AppModule {} // <------ Certifique-se de que essa linha existe!
