import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import { ArrowRight } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Container, Header } from '../styles';
import { FormAnnotation, ProfileBox } from './styles';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/axios';
import { Routes } from '@/enums/routes';
import router from 'next/router';
import { AxiosError } from 'axios';

export default function UpdateProfile() {
  const updateProfileSchema = z.object({
    bio: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  });

  type UpdateProfileData = z.infer<typeof updateProfileSchema>;

  const handleUpdateProfile = async (data: UpdateProfileData) => {
    try {
      await api.put(Routes.apiUpdateProfile, {
        bio: data.bio,
      });
      await router.push(Routes.schedule, {
        query: session.data?.user.username,
      });
    } catch (err: unknown) {
      const error = err as AxiosError<Error>;

      if (error?.response?.data?.name) {
        alert(error.response.data.name);
        return;
      }

      console.error(err);
    }
  };

  const session = useAuth();

  return (
    <Container>
      <Header>
        <Heading as="strong">Defina sua disponibilidade</Heading>
        <Text>Por último, uma breve descrição e uma foto de perfil.</Text>
        <MultiStep size={4} currentStep={4} />
      </Header>
      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text>Foto de perfil</Text>
          <Avatar
            src={session.data?.user.avatar_url}
            alt={session.data?.user.name}
          />
        </label>
        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea placeholder="Seu nome" {...register('bio')} />
          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  return {
    props: {
      session,
    },
  };
};
