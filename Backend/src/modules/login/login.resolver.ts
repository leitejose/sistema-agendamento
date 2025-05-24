import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginService } from './login.service';
import { AuthPayload } from './entities/auth-payload.entity';
import { LoginInput } from './dto/login.input';
import { AuthService } from '../auth/auth.service';

@Resolver()
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Mutation(() => AuthPayload)
  async loginColaborador(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthPayload> {
    console.log('Dados recebidos no backend:', loginInput);

    const authPayload = await this.loginService.login(loginInput);

    console.log('Retornando para o frontend:', authPayload);

    return authPayload;
  }
}

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async forgotPassword(@Args('email') email: string): Promise<string> {
    await this.authService.sendPasswordResetEmail(email);
    return 'Um link de redefinição de senha foi enviado para o seu e-mail.';
  }

  @Mutation(() => String)
  async resetPassword(
    @Args('token') token: string,
    @Args('newPassword') newPassword: string,
  ): Promise<string> {
    await this.authService.resetPassword(token, newPassword);
    return 'Senha redefinida com sucesso.';
  }
}
