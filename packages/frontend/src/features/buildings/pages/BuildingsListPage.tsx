import { useBuildings } from '@features/buildings/hooks/queries/useBuildings'
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Container,
  Group,
  Paper,
  Skeleton,
  Table,
  Text,
  Title,
} from '@mantine/core'
import { Link } from 'react-router'
import { PlusIcon } from '@phosphor-icons/react/dist/csr/Plus'
import { BuildingForm } from '@features/buildings/components/BuildingForm/BuildingForm'
import { useDisclosure } from '@mantine/hooks'
import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye'

export const BuildingsListPage = () => {
  const { data: buildings, isLoading } = useBuildings()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Container size="xl">
        <Group justify="space-between" align="center" mb="md">
          <Title order={1} size="h2">
            Buildings List
          </Title>

          <Button leftSection={<PlusIcon size={20} />} size="md" onClick={open}>
            Create new building
          </Button>
        </Group>

        <Paper shadow="sm" withBorder radius="md">
          {isLoading && <Skeleton height={100} />}

          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="xs" highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Building</Table.Th>
                  <Table.Th>Address</Table.Th>
                  <Table.Th>Manager</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {buildings?.map(
                  ({
                    id,
                    name,
                    address,
                    city,
                    manager,
                    floors,
                    propertyType,
                    district,
                  }) => (
                    <Table.Tr key={id}>
                      <Table.Td>
                        <Group>
                          <Avatar
                            // src="https://via.placeholder.com/150"
                            radius="md"
                            size="lg"
                          />
                          <div>
                            <Text>{name}</Text>
                            <Text size="sm" c="dimmed">
                              {floors} pisos
                            </Text>
                          </div>
                        </Group>
                      </Table.Td>

                      <Table.Td>
                        <Text size="sm" fw={500} lineClamp={2}>
                          {address}
                        </Text>
                        <Text size="sm" c="dimmed">
                          {district}, {city}
                        </Text>
                      </Table.Td>

                      <Table.Td>
                        <Text size="sm" fw={500} lineClamp={2}>
                          {manager?.firstName} {manager?.lastName}
                        </Text>
                        <Text size="sm" c="dimmed">
                          {manager?.email}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge color="blue">{propertyType}</Badge>
                      </Table.Td>

                      <Table.Td>
                        <ActionIcon
                          variant="subtle"
                          component={Link}
                          to={`/buildings/${id}`}
                        >
                          <EyeIcon size={20} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  )
                )}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Paper>
      </Container>

      <BuildingForm opened={opened} onClose={close} />
    </>
  )
}
