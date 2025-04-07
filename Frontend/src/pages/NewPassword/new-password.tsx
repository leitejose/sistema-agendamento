import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import LogoImage from "@/assets/LogoMM.svg";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel, FormField } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "@/graphql/mutations";
import { useState } from "react";

const loginSchema = z
  .object({
    password: z.string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número")
      .regex(/[@$!%*?&]/, "A senha deve conter pelo menos um caractere especial (@, $, !, %, *, ?, &)"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormLogin = z.infer<typeof loginSchema>;

const NewPassword = () => {
  const form = useForm<FormLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (data: FormLogin) => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      setMessage("Token inválido ou ausente.");
      return;
    }

    try {
      await resetPassword({
        variables: {
          token,
          newPassword: data.password,
        },
      });
      setMessage("Senha redefinida com sucesso! Você será redirecionado para o login.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      console.error("Erro ao redefinir a senha:", err);
      setMessage("Erro ao redefinir a senha. Tente novamente.");
    }
  };

  const handleClickRetornLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-1/3 min-w-80 rounded-xl border bg-card text-card-foreground shadow py-12">
        <CardContent className="p-0">
          <img src={LogoImage} alt="Logo" className="w-1/2 h-auto mx-auto" />
        </CardContent>
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Nova Palavra-Chave</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Digite sua nova palavra-chave" {...field} />
                    </FormControl>
                    {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Confirmar Nova Palavra-Chave</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirme sua nova palavra-chave" {...field} />
                    </FormControl>
                    {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                  </FormItem>
                )}
              />
              {message && <p className="text-center text-green-500">{message}</p>}
              {error && <p className="text-center text-red-500">Erro: {error.message}</p>}
              <div className="flex justify-center flex-wrap">
                <Button className="m-5" type="submit" disabled={loading}>
                  {loading ? "Redefinindo..." : "Confirmar Palavra-Chave"}
                </Button>
                <Button
                  className="m-5"
                  variant={"secondary"}
                  type="button"
                  onClick={handleClickRetornLogin}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPassword;
