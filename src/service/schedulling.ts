import { api } from '@/lib/axios'

interface ConfirmSchedulingProps {
  name: string
  email: string
  remarks: string
  username: string
  schedulingDate: Date
}

export const confirmScheduling = async ({
  name,
  email,
  remarks,
  username,
  schedulingDate,
}: ConfirmSchedulingProps) => {
  return await api.post(`/users/${username}/schedule`, {
    name,
    email,
    remarks,
    date: schedulingDate,
  })
}
