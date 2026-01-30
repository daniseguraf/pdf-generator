import dayjs from 'dayjs'

export const getHourFromISO8601 = (date: Date): string => {
  return dayjs.utc(date).format('h:mm A')
}
