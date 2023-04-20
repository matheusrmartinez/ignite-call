import { Calendar } from '@/components/Calendar';
import { Availability } from '@/interfaces/availability';
import { getAvailability } from '@/service/availability';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles';

export const CalendarStep = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const router = useRouter();

  const username = String(router.query.username);

  const isDateSelected = !!selectedDate;

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null;
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null;

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null;

  const { data: availability } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const availability = await getAvailability({
        username,
        selectedDateWithoutTime,
      });

      return availability;
    },
    {
      enabled: !!selectedDate,
    }
  );

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar onDateSelected={setSelectedDate} selectedDate={selectedDate} />
      {isDateSelected ? (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describedDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            {availability?.possibleTimes.map((possibleTime) => (
              <TimePickerItem
                key={possibleTime}
                disabled={!availability.availableTimes.includes(possibleTime)}
              >
                {String(possibleTime).padStart(2, '0')}:00h
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      ) : null}
    </Container>
  );
};
