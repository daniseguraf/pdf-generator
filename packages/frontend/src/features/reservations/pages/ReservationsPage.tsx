import { Container, Select, Stack, Tabs, Text, Title } from '@mantine/core'
import { useBuildingByResidentId } from '@features/reservations/hooks/queries/useBuildingByResidentId'
import { BuildingCardInfo } from '@components/BuildingCardInfo/BuildingCardInfo'
import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { getAreaLabel } from '@features/buildings/components/CommonAreas/CommonAreas.helpers'
import { CommonAreaCard } from '@components/CommonAreaCard/CommonAreaCard'
import { CalendarBlankIcon, ListChecksIcon } from '@phosphor-icons/react'
import { ReservationCalendar } from '@features/reservations/components/ReservationCalendar/ReservationCalendar'
import { ReservationForm } from '@features/reservations/components/ReservationForm/ReservationForm'
import { getCommonAreaColor } from '@utils/getCommonAreaColor'
import { ReservationList } from '@features/reservations/components/ReservationList/ReservationList'

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

  if (isPending || !building) {
    return <span>Loading...</span>
  }

  const {
    propertyType,
    isActive: buildingIsActive,
    name,
    address,
    district,
    city,
    province,
    description: buildingDescription,
    commonAreas = [],
  } = building

  const commonAreaOptions = commonAreas?.map(area => ({
    value: area.id.toString(),
    label: getAreaLabel(area.type),
  }))

  const selectedCommonArea = commonAreas?.find(
    area => area.id === selectedAreaId
  )

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setSelectedSlot(slotInfo)
    openForm()
  }

  const handleClose = () => {
    closeForm()
    setSelectedSlot(null)
  }

  return (
    <Container fluid>
      <BuildingCardInfo
        propertyType={propertyType}
        isActive={buildingIsActive}
        name={name}
        address={address}
        district={district}
        city={city}
        province={province}
        description={buildingDescription}
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

          {selectedCommonArea && (
            <CommonAreaCard
              id={selectedCommonArea.id}
              type={selectedCommonArea.type}
              isActive={selectedCommonArea.isActive}
              description={selectedCommonArea.description}
              capacity={selectedCommonArea.capacity}
              maxHoursPerReservation={selectedCommonArea.maxHoursPerReservation}
              openTime={selectedCommonArea.openTime}
              closeTime={selectedCommonArea.closeTime}
              daysAvailable={selectedCommonArea.daysAvailable}
            />
          )}

          {selectedCommonArea && (
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
                  Mis Reservas ({selectedCommonArea.reservations?.length ?? 0})
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="calendar">
                <ReservationCalendar
                  reservations={selectedCommonArea.reservations ?? []}
                  areaColor={getCommonAreaColor(selectedCommonArea.type)}
                  onSelectSlot={handleSelectSlot}
                  openTime={selectedCommonArea.openTime}
                  closeTime={selectedCommonArea.closeTime}
                  daysAvailable={selectedCommonArea.daysAvailable}
                />
              </Tabs.Panel>

              <Tabs.Panel value="reservations">
                <Text>Mis Reservas</Text>
                <ReservationList
                  reservations={selectedCommonArea.reservations ?? []}
                  areaColor={getCommonAreaColor(selectedCommonArea.type)}
                />
              </Tabs.Panel>
            </Tabs>
          )}
        </Stack>
      </Container>

      {selectedCommonArea && (
        <ReservationForm
          opened={openedForm}
          onClose={handleClose}
          selectedSlot={selectedSlot}
          selectedArea={selectedCommonArea}
        />
      )}
    </Container>
  )
}
