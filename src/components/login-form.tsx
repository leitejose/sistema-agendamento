"Use Client"
import { Card, CardContent, CardHeader } from "./ui/card"
import LogoImage from "@/assets/LogoMM.svg";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";



const formSchema = z.object({
    email: z.string().email("email inválido"),
    password: z.string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .regex(/[0-9]/, "A senha deve conter pelo menos um número")
        .regex(/[@$!%*?&]/, "A senha deve conter pelo menos um caractere especial (@, $, !, %, *, ?, &)"),
});



export const LoginForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {email: "", password: ""},
      })
      const navigate = useNavigate(); 

      const handleClickRecover = () => {
          navigate('/recover-account');
      };   
  
      const handleSubmit = () => {
          console.log(); 
          navigate('/home-screen');
      };
      const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
      }
    return(
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
          name="password"
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
        <Button type="submit" onClick={form.handleSubmit(handleSubmit)}>Entrar</Button>

        </div>
        <div className="flex justify-between">
        <Button variant={"link"} type="button" onClick={handleClickRecover}>Esqueceu a palavra-chave?</Button>
        </div>
      </form>
    </FormProvider>
                </CardContent>
            </Card>
        </div>
    )

    }
    export default LoginForm;