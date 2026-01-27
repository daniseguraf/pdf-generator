import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const fromISO8601ToHour = (isoString: Date) => {
  const parsed = dayjs.utc(isoString)

  return new Date(2026, 0, 1, parsed.hour(), parsed.minute(), parsed.second())
}
