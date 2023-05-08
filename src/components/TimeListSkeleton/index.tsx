import { TimePickerItem, TimePickerList } from './styles'

export const TimeListSkeleton = () => {
  const timeList: string[] = Array.from({ length: 9 })

  return (
    <TimePickerList>
      {timeList.map((_, index) => {
        return <TimePickerItem key={index} />
      })}
    </TimePickerList>
  )
}
