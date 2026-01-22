import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import { Container, Title } from '@mantine/core'
import { useBuildingByResidentId } from '@features/reservations/hooks/queries/useBuildingByResidentId'
import { BuildingCardInfo } from '@components/BuildingCardInfo/BuildingCardInfo'

const localizer = dayjsLocalizer(dayjs)

export const ReservationsPage = () => {
  const { isPending, data: building } = useBuildingByResidentId()

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

      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </Container>
  )
}
