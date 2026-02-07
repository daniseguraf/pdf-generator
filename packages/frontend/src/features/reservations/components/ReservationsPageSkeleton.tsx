import { Skeleton, Stack } from '@mantine/core'

export const ReservationsPageSkeleton = () => {
  return (
    <Stack>
      <Skeleton height={120} radius="md" mb="lg" />

      <Skeleton height={36} width={220} mb="sm" />

      <Stack gap="xs" px="sm">
        <Skeleton height={18} width={116} />
        <Skeleton height={36} radius="md" />
      </Stack>
    </Stack>
  )
}
