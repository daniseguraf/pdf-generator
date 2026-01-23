import { Container, Select, Stack, Tabs, Title } from '@mantine/core'
import { useBuildingByResidentId } from '@features/reservations/hooks/queries/useBuildingByResidentId'
import { BuildingCardInfo } from '@components/BuildingCardInfo/BuildingCardInfo'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { getAreaLabel } from '@features/buildings/components/CommonAreas/CommonAreas.helpers'
import type { CommonArea } from '@my-buildings/shared/index'
import { CommonAreaCard } from '@components/CommonAreaCard/CommonAreaCard'
import { CalendarBlankIcon, ListChecksIcon } from '@phosphor-icons/react'
import { ReservationCalendar } from '@features/reservations/components/ReservationCalendar'

export const ReservationsPage = () => {
  const { isPending, data: building } = useBuildingByResidentId()
  const [opened, { open, close }] = useDisclosure(false)

  const [selectedCommonArea, setSelectedCommonArea] = useState<
    number | undefined
  >(undefined)
  console.log('selectedCommonArea', selectedCommonArea)

  const [currentCommonArea, setCurrentCommonArea] = useState<
    CommonArea | undefined
  >(undefined)

  useEffect(() => {
    if (!selectedCommonArea) {
      setCurrentCommonArea(undefined)
      return
    }

    const commonArea = commonAreas.find(area => area.id === selectedCommonArea)
    setCurrentCommonArea(commonArea)
  }, [selectedCommonArea])

  if (!building) {
    return <span>Building not found</span>
  }

  if (!building?.commonAreas) {
    return <span>Common areas not found</span>
  }

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
    reservations,
  } = building

  const commonAreaOptions = commonAreas.map(area => ({
    value: area.id.toString(),
    label: getAreaLabel(area.type),
  }))

  if (isPending) {
    return <span>Loading...</span>
  }

  console.log(building)

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
              setSelectedCommonArea(value ? Number(value) : undefined)
            }
          />

          {currentCommonArea && (
            <CommonAreaCard
              id={currentCommonArea.id}
              type={currentCommonArea.type}
              isActive={currentCommonArea.isActive}
              description={currentCommonArea.description}
              capacity={currentCommonArea.capacity}
              maxHoursPerReservation={currentCommonArea.maxHoursPerReservation}
              openTime={currentCommonArea.openTime}
              closeTime={currentCommonArea.closeTime}
              daysAvailable={currentCommonArea.daysAvailable}
            />
          )}

          {currentCommonArea && (
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
                  Mis Reservas ({currentCommonArea.reservations?.length ?? 0})
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="calendar">
                <ReservationCalendar
                  reservations={currentCommonArea.reservations ?? []}
                  // areaColor={selectedAreaData.color}
                  // onSelectSlot={handleSelectSlot}
                />
              </Tabs.Panel>

              <Tabs.Panel value="reservations">
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

      {/* <BookingModal
        opened={opened}
        onClose={() => {
          close()
          setSelectedSlot(null)
        }}
        selectedSlot={selectedSlot}
        selectedArea={selectedAreaData}
        onCreateBooking={handleCreateBooking}
      /> */}
    </Container>
  )
}
