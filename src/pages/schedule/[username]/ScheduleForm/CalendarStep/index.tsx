import { Calendar } from '@/components/Calendar'
import { Availability } from '@/interfaces/availability'
import { getAvailability } from '@/service/availability'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  Container,
  HeaderContainer,
  TimePicker,
  TimePickerHeader,
  HeaderModalContent,
  TimePickerItem,
  TimePickerList,
  TimePickerModal,
} from './styles'
import { useWindowSize } from '@/hooks/useWindowSize'
import { Modal } from '@/components/Modal'
import { X } from 'phosphor-react'
import { TimeListSkeleton } from '@/components/TimeListSkeleton'

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export const CalendarStep = ({ onSelectDateTime }: CalendarStepProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const router = useRouter()

  const username = String(router.query.username)

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability, isLoading } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const availability = await getAvailability({
        username,
        selectedDateWithoutTime,
      })

      return availability
    },
    {
      enabled: !!selectedDate,
    },
  )

  const handleSelectTime = (hour: number) => {
    const dateTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDateTime(dateTime)
  }

  const { width } = useWindowSize()

  const TimePickerComponent = () => {
    if (!availability) return <></>

    return (
      <TimePicker>
        <TimePickerHeader>
          {weekDay} <span>{describedDate}</span>
        </TimePickerHeader>
        {isLoading ? (
          <TimeListSkeleton />
        ) : (
          <TimePickerList>
            {availability.possibleTimes.map((hour) => (
              <TimePickerItem
                key={hour}
                onClick={() => handleSelectTime(hour)}
                disabled={!availability.availableTimes.includes(hour)}
              >
                {String(hour).padStart(2, '0')}:00h
              </TimePickerItem>
            ))}
          </TimePickerList>
        )}
      </TimePicker>
    )
  }

  const TimePickerModalComponent = () => {
    return (
      <TimePickerModal>
        <HeaderContainer>
          <X onClick={() => setSelectedDate(null)} />
          <HeaderModalContent>
            {weekDay} <span>{describedDate}</span>
          </HeaderModalContent>
        </HeaderContainer>
        {isLoading ? (
          <TimeListSkeleton />
        ) : (
          <TimePickerList>
            {availability?.possibleTimes.map((hour) => (
              <TimePickerItem
                key={hour}
                onClick={() => handleSelectTime(hour)}
                disabled={!availability.availableTimes.includes(hour)}
              >
                {String(hour).padStart(2, '0')}:00h
              </TimePickerItem>
            ))}
          </TimePickerList>
        )}
      </TimePickerModal>
    )
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar onDateSelected={setSelectedDate} selectedDate={selectedDate} />
      {isDateSelected ? (
        width >= 680 ? (
          <TimePickerComponent />
        ) : (
          <Modal>
            <TimePickerModalComponent />
          </Modal>
        )
      ) : null}
    </Container>
  )
}
