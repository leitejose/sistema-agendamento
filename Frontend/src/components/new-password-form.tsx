"Use Client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import LogoImage from "@/assets/LogoMM.svg";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel, FormField, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Critérios de validação
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número")
      .regex(/[@$!%*?&]/, "A senha deve conter pelo menos um caractere especial (@, $, !, %, *, ?, &)"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], // Marca o erro no campo de confirmação
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

const NewPassword = () => {
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const handleReturnToLogin = () => {
    navigate("/login");
  };

  const onSubmit = (data: PasswordFormValues) => {
    console.log("Nova senha:", data.password);
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-md rounded-xl border bg-white shadow-lg py-8 px-6">
        <CardContent className="text-center mb-6">
          <img src={LogoImage} alt="Logo" className="w-1/2 h-auto mx-auto" />
        </CardContent>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Campo Nova Palavra-Chave */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova Palavra-Chave</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Digite sua nova palavra-chave" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Confirmar Nova Palavra-Chave */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Nova Palavra-Chave</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirme sua nova palavra-chave" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Botões de ação */}
              <div className="flex justify-center gap-4">
                <Button type="submit" className="w-1/2">
                  Confirmar
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-1/2"
                  onClick={handleReturnToLogin}
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
