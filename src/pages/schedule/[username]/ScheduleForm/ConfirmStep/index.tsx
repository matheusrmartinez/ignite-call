import { Button, Text, TextArea, TextInput } from '@ignite-ui/react';
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles';
import { CalendarBlank, Clock } from 'phosphor-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  remarks: z.string().nullable(),
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

export const ConfirmStep = () => {
  const handleConfirmScheduling = (data: ConfirmFormData) => {};

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  });

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          18 de abril de 2023
        </Text>
        <Text>
          <Clock />
          19:39h
        </Text>
      </FormHeader>
      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')}></TextInput>
        {errors?.name ? (
          <FormError size="sm">{errors.name.message}</FormError>
        ) : null}
      </label>
      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com "
          {...register('email')}
        ></TextInput>
        {errors?.email ? (
          <FormError size="sm">{errors?.email?.message}</FormError>
        ) : null}
      </label>
      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('remarks')} />
      </label>
      <FormActions>
        <Button variant="tertiary" type="button">
          Cancelar
        </Button>
        <Button disabled={isSubmitting} type="submit">
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  );
};
