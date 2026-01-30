import type { ReservationListProps } from '@features/reservations/components/ReservationList/ReservationList.types'
import {
  getReservationStatusColor,
  getReservationStatusLabel,
} from '@features/reservations/helpers/reservations.helpers'
import { useDeleteReservation } from '@features/reservations/hooks/mutations/useDeleteReservation'
import {
  Text,
  Group,
  Badge,
  Alert,
  Paper,
  Table,
  Stack,
  ActionIcon,
  Modal,
  Button,
} from '@mantine/core'
import { TimeValue } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
import { InfoIcon, TrashIcon } from '@phosphor-icons/react'
import { fromISO8601To24HFormat } from '@utils/dates/fromISO8601To24HFormat'
import dayjs from 'dayjs'
import { useState } from 'react'

export const ReservationList = ({
  reservations,
  areaColor,
}: ReservationListProps) => {
  const { mutate: deleteReservation, isPending: isDeletingReservation } =
    useDeleteReservation()

  const [reservationIdToDelete, setReservationIdToDelete] = useState<
    number | undefined
  >(undefined)

  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false)

  const isEmptyReservations = reservations.length === 0

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
      <Stack gap="md">
        <Text fw={600} size="lg" mb="md">
          Reservas
        </Text>

        <Paper shadow="sm" withBorder>
          {isEmptyReservations ? (
            <Alert icon={<InfoIcon size={20} />} color="blue" radius="md">
              No hay reservas para este espacio. Selecciona un espacio en el
              calendario para crear una nueva reserva.
            </Alert>
          ) : (
            <Table.ScrollContainer minWidth={800}>
              <Table verticalSpacing="xs" striped withColumnBorders>
                <Table.Thead style={{ backgroundColor: `${areaColor}10` }}>
                  <Table.Tr>
                    <Table.Th w="4%">ID</Table.Th>
                    <Table.Th w="22%">Reservation</Table.Th>
                    <Table.Th w="12%">Date</Table.Th>
                    <Table.Th w="17%">Duration</Table.Th>
                    <Table.Th w="6%">Attendees</Table.Th>
                    <Table.Th w="20%">Notes</Table.Th>
                    <Table.Th w="14%">Status</Table.Th>
                    <Table.Th w="5">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                  {reservations?.map(
                    ({
                      id,
                      title,
                      date,
                      startTime,
                      endTime,
                      status,
                      attendees,
                      notes,
                    }) => (
                      <Table.Tr key={id}>
                        <Table.Td>
                          <Text size="sm">{id}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" lineClamp={2}>
                            {title ?? 'No title'}
                          </Text>
                        </Table.Td>

                        <Table.Td>
                          <Text size="sm">
                            {dayjs(date).format('DD/MM/YYYY')}
                          </Text>
                        </Table.Td>

                        <Table.Td>
                          <Group gap={4}>
                            <TimeValue
                              value={fromISO8601To24HFormat(startTime)}
                              format="12h"
                            />
                            <Text size="sm">-</Text>
                            <TimeValue
                              value={fromISO8601To24HFormat(endTime)}
                              format="12h"
                            />
                          </Group>
                        </Table.Td>

                        <Table.Td>
                          <Text size="sm">{attendees}</Text>
                        </Table.Td>

                        <Table.Td>
                          <Text size="xs" lineClamp={2}>
                            {notes}
                          </Text>
                        </Table.Td>

                        <Table.Td>
                          <Badge
                            color={getReservationStatusColor(status)}
                            variant="outline"
                          >
                            {getReservationStatusLabel(status)}
                          </Badge>
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
              </Table>
            </Table.ScrollContainer>
          )}
        </Paper>
      </Stack>

      <Modal
        title="Delete this reservation?"
        opened={deleteModalOpened}
        onClose={handleCloseDeleteModal}
      >
        Are you sure you want to delete this reservation? This action cannot be
        undone.
        <Group mt="lg" justify="flex-end">
          <Button onClick={handleCloseDeleteModal} variant="default">
            Cancel
          </Button>
          <Button onClick={handleDeleteReservation} color="red">
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  )
}
