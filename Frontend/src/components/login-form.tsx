"use client";
import { Card, CardContent, CardHeader } from "./ui/card";
import LogoImage from "@/assets/LogoMM.svg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_COLABORADOR } from "@/graphql/mutations";

const formSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(
      /[@$!%*?&]/,
      "A senha deve conter pelo menos um caractere especial (@, $, !, %, *, ?, &)"
    ),
});

export const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", senha: "" },
  });
  const navigate = useNavigate();

  const [loginColaborador, { loading, error }] = useMutation(LOGIN_COLABORADOR);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Dados enviados para a mutation:", values);

    try {
      const { data } = await loginColaborador({
        variables: {
          email: values.email, // Certifique-se de que o nome corresponde ao esperado pelo backend
          password: values.senha, // Certifique-se de que o nome corresponde ao esperado pelo backend
        },
      });

      console.log("Resposta do backend:", data);
      if (data?.login) {
        localStorage.setItem("token", data.login);
        navigate("/home-screen"); // Redireciona para a página principal
      } else {
        console.error("Token não recebido.");
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl min-h-screen">
      <Card className="mt-10">
        <CardHeader>
          <img src={LogoImage} alt="Logo" className="w-1/2 h-auto mx-auto" />
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu e-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Palavra-Chave</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Digite sua senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button type="submit" disabled={loading}>
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </div>
              {error && <p className="text-red-500">Erro: {error.message}</p>}
              <div className="flex justify-between">
                <Button
                  variant={"link"}
                  type="button"
                  onClick={() => navigate("/recover-account")}
                >
                  Esqueceu a palavra-chave?
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
