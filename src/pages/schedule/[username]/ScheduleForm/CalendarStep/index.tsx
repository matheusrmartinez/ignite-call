import { Calendar } from '@/components/Calendar';
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles';
import { useState } from 'react';

export const CalendarStep = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const isDateSelected = !!selectedDate;

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar onDateSelected={setSelectedDate} selectedDate={selectedDate} />
      {isDateSelected ? (
        <TimePicker>
          <TimePickerHeader>
            terça-feira <span>20 de setembro</span>
          </TimePickerHeader>
          <TimePickerList>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>09:00h</TimePickerItem>
            <TimePickerItem>10:00h</TimePickerItem>
            <TimePickerItem>15:00h</TimePickerItem>
            <TimePickerItem>15:30h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      ) : null}
    </Container>
  );
};
