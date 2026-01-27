import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export const parseTimeToDate = (timeString: string): Date => {
  const parsedTime = dayjs(timeString, ['HH:mm:ss', 'HH:mm'])

  return dayjs()
    .year(2026)
    .month(0)
    .date(1)
    .hour(parsedTime.hour())
    .minute(parsedTime.minute())
    .second(parsedTime.second())
    .toDate()
}
