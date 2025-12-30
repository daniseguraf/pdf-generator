import { Skeleton } from '@mantine/core'

import { Group, Table } from '@mantine/core'

export const TableSkeleton = () => (
  <Table.Tbody>
    {[...Array(5)].map((_, index) => (
      <Table.Tr key={index}>
        <Table.Td>
          <Group gap="sm">
            <Skeleton height={50} width={50} radius="md" />
            <div>
              <Skeleton height={16} width={150} mb={8} />
              <Skeleton height={12} width={100} />
            </div>
          </Group>
        </Table.Td>

        <Table.Td>
          <Skeleton height={14} width={200} />
        </Table.Td>
        <Table.Td>
          <Skeleton height={14} width={120} />
        </Table.Td>
        <Table.Td>
          <Skeleton height={24} width={80} radius="xl" />
        </Table.Td>
        <Table.Td>
          <Skeleton height={14} width={50} />
        </Table.Td>
      </Table.Tr>
    ))}
  </Table.Tbody>
)
