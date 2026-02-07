import { Group, Skeleton, Stack } from '@mantine/core'

export const BuildingDetailPageSkeleton = () => {
  return (
    <Stack>
      <Group justify="space-between" mb="sm">
        <Skeleton height={36} width={136} />
        <Skeleton height={36} width={136} />
      </Group>

      <Skeleton height={120} radius="md" mb="lg" />

      <Group mb="xs" gap="sm">
        <Skeleton height={40} width={136} />
        <Skeleton height={40} width={136} />
        <Skeleton height={40} width={136} />
      </Group>

      <Skeleton height={240} />
    </Stack>
  )
}
