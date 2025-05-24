import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // Mutation para login
  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    console.log('E-mail recebido:', email);
    console.log('Senha recebida:', password);
    return this.authService.login(email, password);
  }

  // Mutation para solicitar recuperação de senha
  @Mutation(() => String)
  async forgotPassword(@Args('email') email: string): Promise<string> {
    await this.authService.sendPasswordResetEmail(email);
    return 'Um link de redefinição de senha foi enviado para o seu e-mail.';
  }

  // Mutation para redefinir a senha
  @Mutation(() => String)
  async resetPassword(
    @Args('token') token: string,
    @Args('newPassword') newPassword: string,
  ): Promise<string> {
    await this.authService.resetPassword(token, newPassword);
    return 'Senha redefinida com sucesso.';
  }
}
