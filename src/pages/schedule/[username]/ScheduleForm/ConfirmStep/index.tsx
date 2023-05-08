import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { CalendarBlank, Check, Clock } from 'phosphor-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { confirmScheduling } from '@/service/schedulling'
import { Spinner } from '@/components/Spinner'

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
  onCancelOrConfirmClick: () => void
}

export const ConfirmStep = ({
  schedulingDate,
  onCancelOrConfirmClick,
}: ConfirmStepProps) => {
  const router = useRouter()
  const username = String(router.query.username)
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false)
  const [successfullyFetchData, setSuccessfullyFetchData] = useState(false)

  const errorsStatus = [400, 401, 404, 500]

  const handleConfirmScheduling = async (data: ConfirmFormData) => {
    const { name, email, remarks } = data
    setIsFetchingData(true)

    const schedulingResponse = confirmScheduling({
      email,
      name,
      remarks: remarks || '',
      schedulingDate,
      username,
    })

    schedulingResponse
      .then((response) => {
        if (errorsStatus.includes(response.status)) {
          const { message } = response.data
          console.error(message)
        }
        setIsFetchingData(false)
        setSuccessfullyFetchData(true)
        setTimeout(() => {
          onCancelOrConfirmClick()
        }, 3000)
      })
      .catch(({ response }) => {
        const { message } = response.data
        alert(message)
        onCancelOrConfirmClick()
        setIsFetchingData(false)
      })
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
        <Button
          onClick={onCancelOrConfirmClick}
          variant="tertiary"
          type="button"
          disabled={isFetchingData}
        >
          Cancelar
        </Button>
        {isSubmitting || isFetchingData ? (
          <Button aria-disabled type="submit">
            <Spinner />
          </Button>
        ) : successfullyFetchData ? (
          <Button disabled type="button">
            <Check />
          </Button>
        ) : (
          <Button type="submit">Confirmar</Button>
        )}
      </FormActions>
      <ToastContainer />
    </ConfirmForm>
  )
}
