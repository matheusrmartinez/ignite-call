import { CaretLeft, CaretRight } from 'phosphor-react'
import {
  CalendarContainer,
  CalendarHeader,
  CalendarTitle,
  CalendarActions,
  CalendarBody,
  CalendarDay,
} from './styles'

export const CalendarSkeleton = () => {
  const weekDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']

  const calendarWeeks = [
    { week: 0, days: [1, 2, 3, 4, 5, 6, 7] },
    { week: 1, days: [1, 2, 3, 4, 5, 6, 7] },
    { week: 2, days: [1, 2, 3, 4, 5, 6, 7] },
    { week: 3, days: [1, 2, 3, 4, 5, 6, 7] },
    { week: 4, days: [1, 2, 3, 4, 5, 6, 7] },
  ]

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          <span></span>
        </CalendarTitle>
        <CalendarActions>
          <button>
            <CaretLeft />
          </button>
          <button>
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {weekDays.map((weekDay) => {
              return <th key={weekDay}>{weekDay}.</th>
            })}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ week, days }) => (
            <tr key={week}>
              {days.map((_, index) => (
                <td key={index}>
                  <CalendarDay />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
