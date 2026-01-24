import { Container, Select, Stack, Tabs, Text, Title } from '@mantine/core'
import { useBuildingByResidentId } from '@features/reservations/hooks/queries/useBuildingByResidentId'
import { BuildingCardInfo } from '@components/BuildingCardInfo/BuildingCardInfo'
import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { getAreaLabel } from '@features/buildings/components/CommonAreas/CommonAreas.helpers'
import { CommonAreaCard } from '@components/CommonAreaCard/CommonAreaCard'
import { CalendarBlankIcon, ListChecksIcon } from '@phosphor-icons/react'
import { ReservationCalendar } from '@features/reservations/components/ReservationCalendar'
import { ReservationForm } from '@features/reservations/components/ReservationForm/ReservationForm'

export const ReservationsPage = () => {
  const { isPending, data: building } = useBuildingByResidentId()
  const [openedForm, { open: openForm, close: closeForm }] =
    useDisclosure(false)

  const [selectedAreaId, setSelectedAreaId] = useState<number | undefined>(
    undefined
  )

  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date
    end: Date
  } | null>(null)

  const {
    propertyType,
    isActive,
    name,
    address,
    district,
    city,
    province,
    description,
    commonAreas,
  } = building || {}
  // console.log('building', building)

  const commonAreaOptions = commonAreas?.map(area => ({
    value: area.id.toString(),
    label: getAreaLabel(area.type),
  }))

  const selectedArea = commonAreas?.find(area => area.id === selectedAreaId)

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    console.log('slotInfo', slotInfo)
    setSelectedSlot(slotInfo)
    openForm()
  }

  const handleClose = () => {
    closeForm()
    setSelectedSlot(null)
  }

  if (isPending) {
    return <span>Loading...</span>
  }

  return (
    <Container fluid>
      <BuildingCardInfo
        propertyType={propertyType}
        isActive={isActive}
        name={name}
        address={address}
        district={district}
        city={city}
        province={province}
        description={description}
      />

      <Title order={1} size="h2">
        Reservations
      </Title>

      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Select
            label="Seleccionar Área Común"
            data={commonAreaOptions}
            checkIconPosition="right"
            clearable
            onChange={value =>
              setSelectedAreaId(value ? Number(value) : undefined)
            }
          />

          {selectedArea && (
            <CommonAreaCard
              id={selectedArea.id}
              type={selectedArea.type}
              isActive={selectedArea.isActive}
              description={selectedArea.description}
              capacity={selectedArea.capacity}
              maxHoursPerReservation={selectedArea.maxHoursPerReservation}
              openTime={selectedArea.openTime}
              closeTime={selectedArea.closeTime}
              daysAvailable={selectedArea.daysAvailable}
            />
          )}

          {selectedArea && (
            <Tabs defaultValue="calendar" variant="pills" radius="md">
              <Tabs.List mb="lg">
                <Tabs.Tab
                  value="calendar"
                  leftSection={<CalendarBlankIcon size={18} weight="duotone" />}
                >
                  Calendario
                </Tabs.Tab>
                <Tabs.Tab
                  value="reservations"
                  leftSection={<ListChecksIcon size={18} weight="duotone" />}
                >
                  Mis Reservas ({selectedArea.reservations?.length ?? 0})
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="calendar">
                <ReservationCalendar
                  reservations={selectedArea.reservations ?? []}
                  // areaColor={selectedAreaData.color}
                  onSelectSlot={handleSelectSlot}
                />
              </Tabs.Panel>

              <Tabs.Panel value="reservations">
                <Text>Mis Reservas</Text>
                {/* <BookingList
                  bookings={filteredBookings}
                  area={selectedAreaData}
                  onDeleteBooking={handleDeleteBooking}
                /> */}
              </Tabs.Panel>
            </Tabs>
          )}
        </Stack>
      </Container>

      {selectedArea && (
        <ReservationForm
          opened={openedForm}
          onClose={handleClose}
          selectedSlot={selectedSlot}
          selectedArea={selectedArea}
        />
      )}
    </Container>
  )
}
