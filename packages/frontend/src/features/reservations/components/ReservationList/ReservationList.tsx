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
  Paper,
  Table,
  ActionIcon,
  Modal,
  Button,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { TrashIcon } from '@phosphor-icons/react'
import dayjs from 'dayjs'
import { useState } from 'react'
import localeData from 'dayjs/plugin/localeData'
import { NoElementsAvailable } from '@components/NoElementsAvailable'

dayjs.extend(localeData)

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
      <Paper>
        {isEmptyReservations ? (
          <NoElementsAvailable message="No reservations for this space. Select a slot in the calendar to create a new reservation." />
        ) : (
          <Table.ScrollContainer minWidth={800}>
            <Table
              verticalSpacing="xs"
              striped
              withColumnBorders
              highlightOnHover
              withTableBorder
            >
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
                        <Text size="sm">{dayjs(startTime).format('ll')}</Text>
                      </Table.Td>

                      <Table.Td>
                        {dayjs(startTime).format('h:mm A')} -{' '}
                        {dayjs(endTime).format('h:mm A')}
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
