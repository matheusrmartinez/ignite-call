import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Container, Header } from "../styles";
import { AuthError, ConnectBox, ConnectItem } from "./styles";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { validateAuth } from "@/utils/authValidation";

export default function ConnectCalendar() {
  const { data: session } = useSession();
  const router = useRouter();

  const authValidation = validateAuth(router.query);
  // const handleRegister = async (data: RegisterFormData) => {};

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>
      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button
            variant="secondary"
            size="sm"
            type="submit"
            onClick={() => signIn("google")}
          >
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>
        <AuthError size="sm">
          {authValidation.hasError ? authValidation.message : null}
        </AuthError>
        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
