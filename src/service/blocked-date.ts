import { BlockedDates } from '@/interfaces/blocked-dates'
import { api } from '@/lib/axios'

interface BlockedDatesProps {
  username: string
  month: number
  year: number
}

export const getBlockedDates = async ({
  month,
  year,
  username,
}: BlockedDatesProps) => {
  const blockedDates: BlockedDates = await api
    .get<BlockedDates>(`/users/${username}/blocked-dates`, {
      params: {
        year,
        month,
      },
    })
    .then(({ data }) => {
      return data
    })
    .catch(() => {
      return blockedDates
    })

  return blockedDates
}
