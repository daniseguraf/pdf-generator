import dayjs from 'dayjs'

export const isoToDateConstructor = (isoString: Date) => {
  return dayjs(isoString).toDate()
}
