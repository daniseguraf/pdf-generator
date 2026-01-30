import type { ScheduleRangeProps } from '@components/ScheduleRange/ScheduleRange.types'
import { Group, Text } from '@mantine/core'
import { getHourFromISO8601 } from '@utils/dates/getHourFromISO8601'

export const ScheduleRange = ({ openTime, closeTime }: ScheduleRangeProps) => {
  console.log('openTime Card', openTime)
  console.log('closeTime Card', closeTime)

  return (
    <Group gap={4}>
      <Text size="sm">{getHourFromISO8601(openTime)}</Text>
      <Text size="sm">-</Text>
      <Text size="sm">{getHourFromISO8601(closeTime)}</Text>
    </Group>
  )
}
