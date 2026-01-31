import { useBuildings } from '@features/buildings/hooks/queries/buildings/useBuildings'
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Container,
  Group,
  Modal,
  Paper,
  Table,
  Text,
  Title,
} from '@mantine/core'
import { Link } from 'react-router'
import { PlusIcon } from '@phosphor-icons/react/dist/csr/Plus'
import { BuildingForm } from '@features/buildings/components/BuildingForm/BuildingForm'
import { useDisclosure } from '@mantine/hooks'
import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye'
import { TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash'
import { useDeleteBuilding } from '@features/buildings/hooks/mutations/buildings/useDeleteBuilding'
import { useState } from 'react'
import { TableSkeleton } from '@features/buildings/components/TableSkeleton'
import { BuildingsEmptyState } from '@features/buildings/components/BuildingsEmptyState'

export const BuildingsListPage = () => {
  const { isPending, data: buildings } = useBuildings()
  const [opened, { open, close }] = useDisclosure(false)
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false)
  const [buildingIdToDelete, setBuildingIdToDelete] = useState<number | null>(
    null
  )

  const { mutate: deleteBuilding } = useDeleteBuilding()

  const isEmptyBuildings = buildings?.length === 0

  const handleOpenDeleteModal = (buildingId: number) => {
    console.log('handleOpenDeleteModal', buildingId)
    setBuildingIdToDelete(buildingId)
    openDeleteModal()
  }

  const handleDeleteBuilding = () => {
    if (buildingIdToDelete) {
      deleteBuilding(buildingIdToDelete, {
        onSuccess: () => {
          closeDeleteModal()
          setBuildingIdToDelete(null)
        },
      })
    }
  }

  return (
    <>
      <Container size="xl">
        <Group justify="space-between" align="center" mb="md">
          <Title order={1} size="h2">
            Buildings List
          </Title>

          {!isEmptyBuildings && (
            <Button
              leftSection={<PlusIcon size={20} />}
              size="md"
              onClick={open}
            >
              Create new building
            </Button>
          )}
        </Group>

        <Paper shadow="sm" withBorder radius="md">
          {isEmptyBuildings ? (
            <BuildingsEmptyState onCreateBuilding={open} />
          ) : (
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

                {isPending ? (
                  <TableSkeleton />
                ) : (
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
                              <Avatar radius="md" name={name} color="blue" />
                              <div>
                                <Text>{name}</Text>
                                <Text size="sm" c="dimmed">
                                  {floors} floors
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
                            <Group gap="xs" justify="center">
                              <ActionIcon
                                variant="subtle"
                                component={Link}
                                to={`/buildings/${id}`}
                              >
                                <EyeIcon size={20} />
                              </ActionIcon>

                              <ActionIcon
                                variant="subtle"
                                onClick={() => handleOpenDeleteModal(id)}
                              >
                                <TrashIcon size={20} />
                              </ActionIcon>
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      )
                    )}
                  </Table.Tbody>
                )}
              </Table>
            </Table.ScrollContainer>
          )}
        </Paper>
      </Container>

      <BuildingForm opened={opened} onClose={close} />

      <Modal
        title="Delete this building?"
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
      >
        Are you sure you want to delete this building? This action cannot be
        undone.
        <Group mt="lg" justify="flex-end">
          <Button onClick={closeDeleteModal} variant="default">
            Cancel
          </Button>
          <Button onClick={handleDeleteBuilding} color="red">
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  )
}
