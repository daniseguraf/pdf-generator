import { NoElementsAvailable } from '@components/NoElementsAvailable'
import { getAreaLabel } from '@features/buildings/components/CommonAreas/CommonAreas.helpers'
import { useReservationsInBuildingsByManagerId } from '@features/reservations/hooks/queries/useReservationsInBuildingsByManagerId'
import {
  ActionIcon,
  Button,
  Container,
  Group,
  Modal,
  Paper,
  Select,
  Table,
  Text,
  Title,
} from '@mantine/core'
import { TrashIcon } from '@phosphor-icons/react'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import {
  getReservationStatusColor,
  getReservationStatusLabel,
} from '@features/reservations/helpers/reservations.helpers'
import {
  ReservationStatusValues,
  type CommonAreas,
  type ReservationStatus,
} from '@my-buildings/shared/index'
import { useUpdateReservation } from '@features/reservations/hooks/mutations/useUpdateReservation'
import { ReservationTableSkeleton } from '@features/reservations/components/ReservationTableSkeleton'
import { useDeleteReservation } from '@features/reservations/hooks/mutations/useDeleteReservation'
import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
dayjs.extend(localeData)

const reservationStatusOptions = Object.values(ReservationStatusValues).map(
  status => ({
    value: status,
    label: getReservationStatusLabel(status),
  })
)

export const ReservationsManagementPage = () => {
  const { isPending: isLoadingReservations, data: reservations } =
    useReservationsInBuildingsByManagerId()

  const { mutate: updateReservation } = useUpdateReservation()

  const { mutate: deleteReservation, isPending: isDeletingReservation } =
    useDeleteReservation()

  const [reservationIdToDelete, setReservationIdToDelete] = useState<
    number | undefined
  >(undefined)

  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false)

  const isEmptyReservations = reservations?.length === 0

  const handleChangeStatus = (id: number, value: ReservationStatus) => {
    updateReservation({ id, updateReservationDto: { status: value } })
  }

  const handleOpenDeleteModal = (reservationId: number) => {
    setReservationIdToDelete(reservationId)
    openDeleteModal()
  }

  const handleCloseDeleteModal = () => {
    setReservationIdToDelete(undefined)
    closeDeleteModal()
  }

  const handleDeleteReservation = () => {
    if (reservationIdToDelete) {
      deleteReservation(reservationIdToDelete, {
        onSuccess: () => {
          handleCloseDeleteModal()
        },
      })
    }
  }

  return (
    <>
      <Container size="xl">
        <Title order={1} size="h2" mb="md">
          Reservations
        </Title>

        <Paper>
          {isEmptyReservations ? (
            <NoElementsAvailable message="No reservations found" />
          ) : (
            <Table.ScrollContainer minWidth={800}>
              <Table
                verticalSpacing="xs"
                highlightOnHover
                withTableBorder
                striped
                withColumnBorders
              >
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th w="3%">ID</Table.Th>
                    <Table.Th w="18%">Reservation</Table.Th>
                    <Table.Th w="19%">Building</Table.Th>
                    <Table.Th w="11%">Common Area</Table.Th>
                    <Table.Th w="12%">Date</Table.Th>
                    <Table.Th w="14%">Duration</Table.Th>
                    <Table.Th w="6%">Attendees</Table.Th>
                    <Table.Th w="13%">Status</Table.Th>
                    <Table.Th w="4">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>

                {isLoadingReservations ? (
                  <ReservationTableSkeleton />
                ) : (
                  <Table.Tbody>
                    {reservations?.map(
                      ({
                        id,
                        title,
                        startTime,
                        endTime,
                        status,
                        attendees,
                        notes,
                        commonArea,
                      }) => (
                        <Table.Tr key={id}>
                          <Table.Td>
                            <Text size="sm">{id}</Text>
                          </Table.Td>

                          <Table.Td>
                            <Text size="sm" lineClamp={2}>
                              {title ?? 'No title'}
                            </Text>
                            <Text size="xs" lineClamp={2} c="dimmed">
                              {notes}
                            </Text>
                          </Table.Td>

                          <Table.Td>
                            <Text size="sm">{commonArea?.building?.name}</Text>
                          </Table.Td>

                          <Table.Td>
                            <Text size="sm">
                              {getAreaLabel(commonArea?.type as CommonAreas)}
                            </Text>
                          </Table.Td>

                          <Table.Td>
                            <Text size="sm">
                              {dayjs(startTime).format('ll')}
                            </Text>
                          </Table.Td>

                          <Table.Td>
                            {dayjs(startTime).format('h:mm A')} -{' '}
                            {dayjs(endTime).format('h:mm A')}
                          </Table.Td>

                          <Table.Td>
                            <Text size="sm">{attendees}</Text>
                          </Table.Td>

                          <Table.Td>
                            <Select
                              data={reservationStatusOptions}
                              value={status}
                              checkIconPosition="right"
                              onChange={value =>
                                handleChangeStatus(
                                  id,
                                  value as ReservationStatus
                                )
                              }
                              size="xs"
                              styles={{
                                input: {
                                  backgroundColor: `${getReservationStatusColor(status)}10`,
                                  borderColor:
                                    getReservationStatusColor(status),
                                },
                              }}
                            />
                          </Table.Td>

                          <Table.Td>
                            <Group gap="xs" justify="center">
                              <ActionIcon
                                variant="subtle"
                                onClick={() => handleOpenDeleteModal(id)}
                                disabled={isDeletingReservation}
                                loading={isDeletingReservation}
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

      <Modal
        title="Delete this reservation?"
        opened={deleteModalOpened}
        onClose={handleCloseDeleteModal}
      >
        Are you sure you want to delete this reservation? This action cannot be
        undone.
        <Group mt="lg" justify="flex-end">
          <Button
            onClick={handleCloseDeleteModal}
            variant="default"
            disabled={isDeletingReservation}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteReservation}
            color="red"
            loading={isDeletingReservation}
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  )
}
