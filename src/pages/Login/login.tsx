import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import LogoImage from "@/assets/LogoMM.svg";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel, FormField } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Critérios de validação
const loginSchema = z.object({
    email: z.string().email("O e-mail é inválido"),
    password: z.string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .regex(/[0-9]/, "A senha deve conter pelo menos um número")
        .regex(/[@$!%*?&]/, "A senha deve conter pelo menos um caractere especial (@, $, !, %, *, ?, &)")
});

type FormLogin = z.infer<typeof loginSchema>;

const Login = () => {
    const form = useForm<FormLogin>({ 
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });
    
    const navigate = useNavigate(); 

    const handleClickRecover = () => {
        navigate('/recover-account');
    };   

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-1/3 min-w-80 rounded-xl border bg-card text-card-foreground shadow py-12 ">
                <CardContent className="p-0">
                    <img src={LogoImage} alt="Logo" className="w-1/2 h-auto mx-auto" />
                </CardContent>
                <CardContent className="p-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(data => console.log(data))} className="space-y-4">
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
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>Palavra-Chave</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Digite sua palavra-chave" {...field} />
                                        </FormControl>
                                        {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-center">
                                <Button type="submit">Entrar</Button>
                            </div>
                            <div className="mt-4 text-start">
                                <span 
                                    className="text-gray-600 underline hover:text-black cursor-pointer" 
                                    onClick={handleClickRecover}
                                >
                                    Esqueceu a senha?
                                </span>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card> 
        </div>
    )
};

export default Login;
