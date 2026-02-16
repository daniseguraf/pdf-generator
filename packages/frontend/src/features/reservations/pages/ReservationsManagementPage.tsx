import { NoElementsAvailable } from '@components/NoElementsAvailable'
import { getAreaLabel } from '@features/buildings/components/CommonAreas/CommonAreas.helpers'
import { useReservationsInBuildingsByManagerId } from '@features/reservations/hooks/queries/useReservationsInBuildingsByManagerId'
import { ActionIcon, Group, Paper, Select, Table, Text } from '@mantine/core'
import { TrashIcon } from '@phosphor-icons/react'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { getReservationStatusLabel } from '@features/reservations/helpers/reservations.helpers'
import {
  ReservationStatusValues,
  type ReservationStatus,
} from '@my-buildings/shared/index'
import { useUpdateReservation } from '@features/reservations/hooks/mutations/useUpdateReservation'
dayjs.extend(localeData)

const reservationStatusOptions = Object.values(ReservationStatusValues).map(
  status => ({
    value: status,
    label: getReservationStatusLabel(status),
  })
)

console.log('reservationStatusOptions', reservationStatusOptions)

export const ReservationsManagementPage = () => {
  const { isPending, data: reservations } =
    useReservationsInBuildingsByManagerId()

  const { mutate: updateReservation } = useUpdateReservation()

  const isEmptyReservations = reservations?.length === 0

  const handleChangeStatus = (id: number, value: ReservationStatus) => {
    updateReservation({ id, updateReservationDto: { status: value } })
  }

  return (
    <Paper>
      {isEmptyReservations ? (
        <NoElementsAvailable message="No reservations found." />
      ) : (
        <Table.ScrollContainer minWidth={800}>
          <Table
            verticalSpacing="xs"
            striped
            withColumnBorders
            highlightOnHover
            withTableBorder
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
                      <Text size="sm">{getAreaLabel(commonArea?.type)}</Text>
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
                      <Select
                        data={reservationStatusOptions}
                        value={status}
                        checkIconPosition="right"
                        onChange={value => handleChangeStatus(id, value)}
                      />
                    </Table.Td>

                    <Table.Td>
                      <Group gap="xs" justify="center">
                        <ActionIcon
                          variant="subtle"
                          // onClick={() => handleOpenDeleteModal(id)}
                          // disabled={isDeletingReservation}
                          // loading={isDeletingReservation}
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
  )
}
