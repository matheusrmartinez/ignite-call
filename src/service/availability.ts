import { Availability } from '@/interfaces/availability'
import { api } from '@/lib/axios'
import dayjs from 'dayjs'

interface AvailabilityProps {
  username: string
  selectedDateWithoutTime: string | null
}

export const getAvailability = async ({
  username,
  selectedDateWithoutTime,
}: AvailabilityProps) => {
  const availability: Availability = await api
    .get<Availability>(`/users/${username}/availability`, {
      params: {
        date: dayjs(selectedDateWithoutTime).format('YYYY-MM-DD'),
      },
    })
    .then(({ data }) => {
      return data
    })
    .catch(() => {
      return availability
    })

  return availability
}
