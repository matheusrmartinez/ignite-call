import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Header, Container, Form, FormError } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Register() {
  const {
    query: { username },
  } = useRouter();

  const [userName, _] = useState(username);

  const registerFormSchema = z.object({
    username: z
      .string()
      .min(3, { message: "O usuário precisa ter pelo menos 3 letras" })
      .regex(/^([a-z\\\\-]+)$/i, {
        message: "O usuário pode ter apenas números e hífens",
      })
      .transform((username) => username.toLowerCase()),
    name: z
      .string()
      .min(3, { message: "O nome precisa ter pelo menos 3 letras" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  type RegisterFormData = z.infer<typeof registerFormSchema>;

  const handleRegister = async (data: RegisterFormData) => {
    console.log(data);
  };

  useEffect(() => {
    if (userName) {
      setValue("username", String(userName));
      router.replace("/register", undefined, { shallow: true });
    }
  }, [userName, setValue]);

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem vindo ao Ignite Call</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={1} />
      </Header>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            value={username}
            prefix="ignite.com/"
            placeholder="seu-usuário"
            {...register("username")}
          />
          {errors.username ? (
            <FormError size="sm">{errors.username.message}</FormError>
          ) : null}
        </label>
        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register("name")}></TextInput>
          {errors.name ? (
            <FormError size="sm">{errors.name.message}</FormError>
          ) : null}
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
}
