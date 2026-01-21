import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const fromISO8601To24HFormat = (date: Date | string): string => {
  return dayjs.utc(date).format('HH:mm')
}
