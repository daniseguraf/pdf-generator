import { Container, Stack, Tabs, Title } from '@mantine/core'
import { useBuildingByResidentId } from '@features/reservations/hooks/queries/useBuildingByResidentId'
import { BuildingCardInfo } from '@components/BuildingCardInfo/BuildingCardInfo'
import { AreaSelector } from '@features/reservations/components/AreaSelector'
import { useState } from 'react'
import { CalendarBlankIcon, ListChecksIcon } from '@phosphor-icons/react'
import { CalendarView } from '@features/reservations/components/CalendarView'
import { BookingList } from '@features/reservations/components/BookingList'
import { BookingModal } from '@features/reservations/components/BookingModal'

export interface CommonArea {
  id: string
  name: string
  icon: string
  color: string
  capacity: number
  maxHours: number
  openTime: string
  closeTime: string
  description: string
}

export interface Booking {
  id: string
  areaId: string
  title: string
  start: Date
  end: Date
  userName: string
  userEmail: string
  attendees: number
}

const commonAreas: CommonArea[] = [
  {
    id: '1',
    name: 'Salón de Eventos',
    icon: 'users',
    color: '#7950f2',
    capacity: 50,
    maxHours: 8,
    openTime: '08:00',
    closeTime: '23:00',
    description:
      'Espacio amplio ideal para celebraciones, fiestas y eventos especiales.',
  },
  {
    id: '2',
    name: 'Gimnasio',
    icon: 'barbell',
    color: '#f03e3e',
    capacity: 20,
    maxHours: 2,
    openTime: '06:00',
    closeTime: '22:00',
    description:
      'Equipado con máquinas de cardio, pesas y espacio para ejercicios funcionales.',
  },
  {
    id: '3',
    name: 'Piscina',
    icon: 'swim',
    color: '#1971c2',
    capacity: 30,
    maxHours: 3,
    openTime: '07:00',
    closeTime: '20:00',
    description:
      'Piscina climatizada con área de chapoteo para niños y zona profunda.',
  },
  {
    id: '4',
    name: 'Sala de Juegos',
    icon: 'game-controller',
    color: '#2f9e44',
    capacity: 15,
    maxHours: 4,
    openTime: '09:00',
    closeTime: '21:00',
    description:
      'Mesa de billar, ping pong, futbolín y consolas de videojuegos.',
  },
  {
    id: '5',
    name: 'Terraza',
    icon: 'sun',
    color: '#f59f00',
    capacity: 40,
    maxHours: 6,
    openTime: '10:00',
    closeTime: '22:00',
    description:
      'Terraza al aire libre con parrillas, mesas y vista panorámica de la ciudad.',
  },
  {
    id: '6',
    name: 'Sala de Reuniones',
    icon: 'presentation',
    color: '#ae3ec9',
    capacity: 12,
    maxHours: 4,
    openTime: '08:00',
    closeTime: '20:00',
    description:
      'Sala equipada con proyector, pizarra y conexión a internet de alta velocidad.',
  },
]

export const ReservationsPage = () => {
  const { isPending, data: building } = useBuildingByResidentId()
  const { commonAreas } = building
  console.log('commonAreas', commonAreas)

  const [selectedArea, setSelectedArea] = useState<string | null>(
    commonAreas[0].id
  )
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      areaId: '1',
      title: 'Fiesta de Cumpleaños',
      start: new Date(2026, 0, 22, 18, 0),
      end: new Date(2026, 0, 22, 22, 0),
      userName: 'María García',
      userEmail: 'maria@example.com',
      attendees: 25,
    },
    {
      id: '2',
      areaId: '2',
      title: 'Sesión de Entrenamiento',
      start: new Date(2026, 0, 23, 7, 0),
      end: new Date(2026, 0, 23, 8, 30),
      userName: 'Carlos Ruiz',
      userEmail: 'carlos@example.com',
      attendees: 10,
    },
    {
      id: '3',
      areaId: '3',
      title: 'Clases de Natación',
      start: new Date(2026, 0, 24, 16, 0),
      end: new Date(2026, 0, 24, 17, 0),
      userName: 'Ana Martínez',
      userEmail: 'ana@example.com',
      attendees: 8,
    },
  ])
  const [modalOpened, setModalOpened] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date
    end: Date
  } | null>(null)

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setSelectedSlot(slotInfo)
    setModalOpened(true)
  }

  const handleCreateBooking = (booking: Omit<Booking, 'id'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
    }
    setBookings([...bookings, newBooking])
    setModalOpened(false)
    setSelectedSlot(null)
  }

  const handleDeleteBooking = (id: string) => {
    setBookings(bookings.filter(b => b.id !== id))
  }

  const selectedAreaData = commonAreas.find(a => a.id === selectedArea)
  const filteredBookings = bookings.filter(b => b.areaId === selectedArea)

  if (isPending) {
    return <span>Loading...</span>
  }

  if (!building) {
    return <span>Building not found</span>
  }
  console.log(building)

  const {
    propertyType,
    isActive,
    name,
    address,
    district,
    city,
    province,
    description,
  } = building

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
          <AreaSelector
            areas={commonAreas}
            selectedArea={selectedArea}
            onSelectArea={setSelectedArea}
          />

          {selectedAreaData && (
            <Tabs defaultValue="calendar" variant="pills" radius="md">
              <Tabs.List mb="lg">
                <Tabs.Tab
                  value="calendar"
                  leftSection={<CalendarBlankIcon size={18} weight="duotone" />}
                >
                  Calendario
                </Tabs.Tab>
                <Tabs.Tab
                  value="bookings"
                  leftSection={<ListChecksIcon size={18} weight="duotone" />}
                >
                  Mis Reservas ({filteredBookings.length})
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="calendar">
                <CalendarView
                  bookings={filteredBookings}
                  areaColor={selectedAreaData.color}
                  onSelectSlot={handleSelectSlot}
                />
              </Tabs.Panel>

              <Tabs.Panel value="bookings">
                <BookingList
                  bookings={filteredBookings}
                  area={selectedAreaData}
                  onDeleteBooking={handleDeleteBooking}
                />
              </Tabs.Panel>
            </Tabs>
          )}
        </Stack>
      </Container>

      <BookingModal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false)
          setSelectedSlot(null)
        }}
        selectedSlot={selectedSlot}
        selectedArea={selectedAreaData}
        onCreateBooking={handleCreateBooking}
      />
    </Container>
  )
}
