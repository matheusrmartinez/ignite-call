import { Routes } from '@/enums/routes'
import { useAuth } from '@/hooks/useAuth'
import { validateAuth } from '@/utils/authValidation'
import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'
import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { NextSeo } from 'next-seo'

export default function ConnectCalendar() {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const authValidationResult = validateAuth(router.query)

  if (isSignedIn && authValidationResult.hasError) {
    router.replace(Routes.connectCalendar, undefined, { shallow: true })
  }

  const handleConnectCalendar = async () => {
    await signIn('google')
  }

  return (
    <>
      <NextSeo title="Conecte sua agenda | Ignite Call" noindex />
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
            {isSignedIn ? (
              <Button size="sm" disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button
                disabled={isSignedIn}
                variant="secondary"
                size="sm"
                type="submit"
                onClick={handleConnectCalendar}
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>
          <AuthError size="sm">
            {authValidationResult.hasError && authValidationResult.message}
          </AuthError>
          <Button
            type="submit"
            onClick={() => router.push(Routes.registerUsersTimeIntervals)}
            disabled={!isSignedIn}
          >
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
