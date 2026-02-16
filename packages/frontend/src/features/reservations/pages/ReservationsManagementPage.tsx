import { Paper } from '@mantine/core'

export const ReservationsManagementPage = () => {
  const reservations = []
  const isEmptyReservations = reservations.length === 0

  return (
    <Paper>
      qqq
      {/* {isEmptyReservations ? (
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
      )} */}
    </Paper>
  )
}
