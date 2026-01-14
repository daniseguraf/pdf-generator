import { useParams, useNavigate } from 'react-router'
import {
  Container,
  Button,
  Group,
  Text,
  Paper,
  Grid,
  Tabs,
  ThemeIcon,
  Card,
  Box,
  Badge,
  Title,
  List,
} from '@mantine/core'
import {
  BuildingOfficeIcon,
  CaretDoubleLeftIcon,
  CheckIcon,
  PencilIcon,
  MapPinIcon,
  HouseIcon,
} from '@phosphor-icons/react'

import { useBuilding } from '@features/buildings/hooks/queries/buildings/useBuilding'
import { PropertyTypeValues } from '@my-buildings/shared/types/prisma.types'
import { BuildingForm } from '@features/buildings/components/BuildingForm/BuildingForm'
import { useDisclosure } from '@mantine/hooks'
import { amenitiesDictionary } from '@utils/amenities.dictionary'
import { CommonAreas } from '@features/buildings/components/CommonAreas/CommonAreas'
import { GeneralInformation } from '@features/buildings/components/GeneralInformation/GeneralInformation'

export const BuildingDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [opened, { open, close }] = useDisclosure(false)

  const { isPending, data: building } = useBuilding(Number(id))

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
  } = building ?? {}

  const getTypeColor = (type: string) => {
    switch (type) {
      case PropertyTypeValues.COMMERCIAL:
        return 'blue'
      case PropertyTypeValues.RESIDENTIAL:
        return 'violet'
      case PropertyTypeValues.MIXED:
        return 'teal'
      default:
        return 'gray'
    }
  }

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

        <Paper shadow="md" radius="md" withBorder mb="xl">
          <Box p="xl">
            <Group justify="space-between" mb="md">
              <div>
                <Group gap="xs" mb="xs">
                  <Badge
                    color={getTypeColor(building.propertyType)}
                    variant="light"
                    size="lg"
                  >
                    {propertyType}
                  </Badge>
                  <Badge
                    color={building.isActive ? 'green' : 'red'}
                    variant="dot"
                    size="lg"
                  >
                    {isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </Group>

                <Title order={1} mb="xs">
                  {name}
                </Title>

                <Group gap="xs">
                  <MapPinIcon size={18} />
                  <Text c="dimmed">
                    {address}, {district} - {city}, {province}
                  </Text>
                </Group>
              </div>
            </Group>

            <Text c="dimmed" mt="md">
              {description}
            </Text>
          </Box>
        </Paper>

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
