"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

//Definindo qual o formato a se seguir do nosso formulário
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Título obrigatório",
  }),
});

const CreatePage = () => {
  // definindo hook router
  const router = useRouter();

  // definindo o formulario usando o hook useForm e passando pra ele qual modelo de formulario ele deve seguir
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  // chamando propriedades que verificam ESTADOS atuais do formulario, fornecidos pelo formState (isSubmitting, isValid) são apenas 2 dentre varias propriedades disponiveis
  const { isSubmitting, isValid } = form.formState;

  // definindo a ação ao clicar no button submit (lembrando que é uma constante, deverá ser chamada como propriedade nos manipuladores de evento onClick ou onSubmit)
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
      toast({
        title: "Salvo",
        description: "Seu curso foi registrado com sucesso!"
      })
    } catch (error) {
      console.log("Alguma coisa deu errado");
      toast({
        title: `Ops, alguma coisa deu errado!`,
        description:
          "Veja se todos os campos foram preenchidos da forma correta",
        variant: "destructive",
      });
    }

    console.log(values);
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Dê um nome ao seu curso</h1>
        <p className="text-sm text-slate-600">
          Como gostaria de chamar este curso? Não se preocupe você pode alterar
          depois!
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do curso</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Ex: Desenvolvimento web avançado"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    O que será ensinado neste curso?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href={"/teacher/courses"}>
                <Button type="button" variant={"ghost"}>
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continuar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
