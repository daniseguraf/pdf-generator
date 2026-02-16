import { Skeleton } from '@mantine/core'

import { Group, Table } from '@mantine/core'

export const ReservationTableSkeleton = () => (
  <Table.Tbody>
    {[...Array(5)].map((_, index) => (
      <Table.Tr key={index}>
        <Table.Td>
          <Skeleton height={14} width={24} />
        </Table.Td>

        <Table.Td>
          <Group gap="sm">
            <Skeleton height={14} width={150} />
            <Skeleton height={8} width={100} />
          </Group>
        </Table.Td>

        <Table.Td>
          <Skeleton height={14} width={150} />
        </Table.Td>

        <Table.Td>
          <Skeleton height={14} width={120} />
        </Table.Td>

        <Table.Td>
          <Skeleton height={14} width={80} />
        </Table.Td>

        <Table.Td>
          <Skeleton height={14} width={60} />
        </Table.Td>

        <Table.Td>
          <Skeleton height={14} width={54} />
        </Table.Td>

        <Table.Td>
          <Skeleton height={14} width={54} />
        </Table.Td>

        <Table.Td>
          <Skeleton height={14} width={40} />
        </Table.Td>
      </Table.Tr>
    ))}
  </Table.Tbody>
)
