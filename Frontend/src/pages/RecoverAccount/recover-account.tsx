import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD } from "@/graphql/mutations";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormItem, FormLabel, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LogoImage from "@/assets/LogoMM.svg";

const loginSchema = z.object({
  email: z.string().email("O e-mail é inválido"),
});

type FormLogin = z.infer<typeof loginSchema>;

const RecoverAccount = () => {
  const form = useForm<FormLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();
  const [forgotPassword, { loading, error }] = useMutation(FORGOT_PASSWORD);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (data: FormLogin) => {
    try {
      await forgotPassword({ variables: { email: data.email } });
      alert("Um link de redefinição de senha foi enviado para o seu e-mail.");
    } catch (err) {
      console.error("Erro ao enviar o e-mail:", err);
      setMessage("Erro ao enviar o e-mail. Verifique se o e-mail está correto.");
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
        <CardDescription className="flex justify-center text-center px-10">
          <h2>
            Insira o e-mail com o qual a sua conta foi registada. Enviaremos um link para a
            alteração da sua palavra-chave.
          </h2>
        </CardDescription>
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu e-mail de utilizador" {...field} />
                    </FormControl>
                    {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                  </FormItem>
                )}
              />
              {message && <p className="text-center text-green-500">{message}</p>}
              {error && <p className="text-center text-red-500">Erro: {error.message}</p>}
              <div className="flex justify-center flex-wrap">
                <Button className="m-5" type="submit" disabled={loading}>
                  {loading ? "Enviando..." : "Redefinir palavra-chave"}
                </Button>
                <Button
                  className="m-5"
                  onClick={handleClickRetornLogin}
                  variant={"secondary"}
                  type="button"
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

export default RecoverAccount;
