import { Alert, Container, Select, Stack, Tabs, Title } from '@mantine/core'
import { useBuildingByResidentId } from '@features/reservations/hooks/queries/useBuildingByResidentId'
import { BuildingCardInfo } from '@components/BuildingCardInfo/BuildingCardInfo'
import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { getAreaLabel } from '@features/buildings/components/CommonAreas/CommonAreas.helpers'
import { CommonAreaCard } from '@components/CommonAreaCard/CommonAreaCard'
import {
  CalendarBlankIcon,
  InfoIcon,
  ListChecksIcon,
} from '@phosphor-icons/react'
import { ReservationCalendar } from '@features/reservations/components/ReservationCalendar/ReservationCalendar'
import { ReservationForm } from '@features/reservations/components/ReservationForm/ReservationForm'
import { getCommonAreaColor } from '@utils/getCommonAreaColor'
import { ReservationList } from '@features/reservations/components/ReservationList/ReservationList'
import { useAuth } from '@features/auth/hooks/useAuth'
import type { CalendarSlot } from '@features/reservations/pages/ReservationsPage/ReservationsPage.types'
import { ReservationsPageSkeleton } from '@features/reservations/components/ReservationsPageSkeleton'

export const ReservationsPage = () => {
  const { isPending, data: building } = useBuildingByResidentId()
  const { user } = useAuth()

  const [openedForm, { open: openForm, close: closeForm }] =
    useDisclosure(false)

  const [selectedAreaId, setSelectedAreaId] = useState<number | undefined>(
    undefined
  )

  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | null>(null)

  if (isPending) return <ReservationsPageSkeleton />

  if (!building) {
    return (
      <Alert icon={<InfoIcon size={20} />} color="yellow" radius="md">
        The building you are looking for is not available
      </Alert>
    )
  }

  const {
    id,
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

  const reservationsByLoggedUserAndCommonArea =
    selectedCommonArea?.reservations?.filter(
      reservation => reservation.userId === user?.id
    ) ?? []

  const handleSelectSlot = (slotInfo: CalendarSlot) => {
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
        id={id}
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
        Make a Reservation
      </Title>

      <Container fluid py="lg">
        <Stack gap="xl">
          <Select
            label="Common Area"
            placeholder="Select a common area"
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
            <Tabs defaultValue="calendar" variant="outline" radius="md">
              <Tabs.List mb="lg">
                <Tabs.Tab
                  value="calendar"
                  leftSection={<CalendarBlankIcon size={18} weight="duotone" />}
                >
                  Calendar
                </Tabs.Tab>
                <Tabs.Tab
                  value="reservations"
                  leftSection={<ListChecksIcon size={18} weight="duotone" />}
                >
                  My Reservations (
                  {reservationsByLoggedUserAndCommonArea?.length ?? 0})
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
                  currentUserId={user?.id ?? 0}
                />
              </Tabs.Panel>

              <Tabs.Panel value="reservations">
                <ReservationList
                  reservations={reservationsByLoggedUserAndCommonArea}
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
