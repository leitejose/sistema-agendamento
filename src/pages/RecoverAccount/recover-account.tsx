import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import LogoImage from "@/assets/LogoMM.svg";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel, FormField } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
    email: z.string().email("O e-mail é inválido"),
});

type FormLogin = z.infer<typeof loginSchema>;

const RecoverAccount = () => {
    const form = useForm<FormLogin>({ 
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: ''
        }
    });
    
    const navigate = useNavigate();

    const handleClickRetornLogin = () => {
        navigate('/login'); 
    };   

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-1/3 min-w-80 rounded-xl border bg-card text-card-foreground shadow py-12 ">
                <CardContent className="p-0">
                    <img src={LogoImage} alt="Logo" className="w-1/2 h-auto mx-auto" />
                </CardContent>
                <CardDescription className="flex justify-center text-center px-10"> <h2>Insira o e-mail com o qual a sua conta foi registada. Enviaremos um link, para a alteração da sua palavra-chave. </h2> </CardDescription>
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
                           <div className="flex justify-center flex-wrap">
                                <Button className="m-5" type="submit">Redefinir palavra-chave</Button>
                                <Button className="m-5"onClick={handleClickRetornLogin} variant={"secondary"} type="submit">Cancelar</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card> 
        </div>
    )
};

export default RecoverAccount;
