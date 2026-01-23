import { useParams, useNavigate } from 'react-router'
import {
  Container,
  Button,
  Group,
  Text,
  Grid,
  Tabs,
  ThemeIcon,
  Card,
  Title,
  List,
} from '@mantine/core'
import {
  BuildingOfficeIcon,
  CaretDoubleLeftIcon,
  CheckIcon,
  PencilIcon,
  HouseIcon,
} from '@phosphor-icons/react'

import { useBuilding } from '@features/buildings/hooks/queries/buildings/useBuilding'
import { BuildingForm } from '@features/buildings/components/BuildingForm/BuildingForm'

import { useDisclosure } from '@mantine/hooks'
import { amenitiesDictionary } from '@utils/amenities.dictionary'
import { CommonAreas } from '@features/buildings/components/CommonAreas/CommonAreas'
import { GeneralInformation } from '@features/buildings/components/GeneralInformation/GeneralInformation'
import { BuildingCardInfo } from '@components/BuildingCardInfo/BuildingCardInfo'

export const BuildingDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [opened, { open, close }] = useDisclosure(false)

  const { isPending, data: building } = useBuilding(Number(id))

  if (isPending) {
    return <span>Loading...</span>
  }

  if (!building) {
    return (
      <Container size="xl" py="xl">
        <Text>Edificio no encontrado</Text>
        <Button onClick={() => navigate('/')} mt="md">
          Volver al listado
        </Button>
      </Container>
    )
  }

  const {
    name,
    propertyType,
    isActive,
    address,
    district,
    city,
    province,
    description,
    floors,
    yearBuilt,
    manager,
    amenities = [],
    commonAreas = [],
  } = building

  return (
    <>
      <Container size="xl">
        <Group justify="space-between" mb="xl">
          <Button
            variant="light"
            leftSection={<CaretDoubleLeftIcon size={20} />}
            onClick={() => navigate('/')}
          >
            Back to list
          </Button>
          <Button leftSection={<PencilIcon size={20} />} onClick={open}>
            Edit Building
          </Button>
        </Group>

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

        {/* Tabs */}
        <Tabs defaultValue="general" variant="outline">
          <Tabs.List mb="xl">
            <Tabs.Tab
              value="general"
              leftSection={<BuildingOfficeIcon size={18} />}
            >
              Información General
            </Tabs.Tab>

            <Tabs.Tab value="commonAreas" leftSection={<HouseIcon size={18} />}>
              Areas Comunes
            </Tabs.Tab>

            <Tabs.Tab value="amenities" leftSection={<CheckIcon size={18} />}>
              Amenidades
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="general">
            <GeneralInformation
              floors={floors}
              yearBuilt={yearBuilt}
              manager={manager}
            />
          </Tabs.Panel>

          <Tabs.Panel value="commonAreas">
            <CommonAreas commonAreas={commonAreas} />
          </Tabs.Panel>

          <Tabs.Panel value="amenities">
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={3} mb="lg">
                    Available Amenities
                  </Title>
                  {amenities?.length > 0 && (
                    <>
                      <List
                        spacing="md"
                        icon={
                          <ThemeIcon color="teal" size={24} radius="xl">
                            <CheckIcon size={16} />
                          </ThemeIcon>
                        }
                      >
                        {amenities.map(amenity => (
                          <List.Item key={amenity}>
                            <Text>{amenitiesDictionary[amenity]}</Text>
                          </List.Item>
                        ))}
                      </List>
                    </>
                  )}
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>
        </Tabs>
      </Container>

      <BuildingForm
        opened={opened}
        onClose={close}
        building={building}
        isEdit
      />
    </>
  )
}
