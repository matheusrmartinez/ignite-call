import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { api } from '@/lib/axios'

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  remarks: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export const ConfirmStep = ({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) => {
  const router = useRouter()
  const username = String(router.query.username)

  const handleConfirmScheduling = async (data: ConfirmFormData) => {
    const { name, email, remarks } = data

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      remarks,
      date: schedulingDate,
    })

    onCancelConfirmation()
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const describedDate = dayjs(schedulingDate).format('DD [ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
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
        <Button onClick={onCancelConfirmation} variant="tertiary" type="button">
          Cancelar
        </Button>
        <Button disabled={isSubmitting} type="submit">
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
