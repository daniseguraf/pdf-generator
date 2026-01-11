import { useParams, useNavigate } from 'react-router'
import {
  Container,
  Button,
  Group,
  Text,
  Paper,
  Grid,
  Tabs,
  Stack,
  ThemeIcon,
  Card,
  Box,
  Badge,
  Title,
  Avatar,
  Divider,
  List,
} from '@mantine/core'
import {
  BuildingOfficeIcon,
  CalendarIcon,
  CaretDoubleLeftIcon,
  CheckIcon,
  PencilIcon,
  StackIcon,
  MapPinIcon,
  UsersIcon,
  HouseIcon,
} from '@phosphor-icons/react'

import { useBuilding } from '@features/buildings/hooks/queries/useBuilding'
import { PropertyTypeValues } from '@my-buildings/shared/types/prisma.types'
import { BuildingForm } from '@features/buildings/components/BuildingForm/BuildingForm'
import { useDisclosure } from '@mantine/hooks'
import { amenitiesDictionary } from '@utils/amenities.dictionary'
import { CommonAreaList } from '@features/buildings/components/CommonAreaList/CommonAreaList'

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
  console.log(building)

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
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack gap="md">
                    <Group>
                      <ThemeIcon size="xl" variant="light" color="blue">
                        <BuildingOfficeIcon size={24} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" c="dimmed">
                          Pisos
                        </Text>
                        <Text size="xl">{floors}</Text>
                      </div>
                    </Group>

                    <Group>
                      <ThemeIcon size="xl" variant="light" color="violet">
                        <StackIcon size={24} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" c="dimmed">
                          Unidades
                        </Text>
                        {/* <Text size="xl">{units}</Text> */}
                      </div>
                    </Group>

                    <Group>
                      <ThemeIcon size="xl" variant="light" color="teal">
                        <CalendarIcon size={24} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" c="dimmed">
                          Año de Construcción
                        </Text>
                        <Text size="xl">{yearBuilt}</Text>
                      </div>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                  <Stack gap="md">
                    <Group>
                      <Avatar size="lg" color="blue">
                        <UsersIcon size={24} />
                      </Avatar>
                      <div>
                        <Text size="sm" c="dimmed">
                          Manager Responsable
                        </Text>
                        <Text size="lg">
                          {manager?.firstName} {manager?.lastName}
                        </Text>
                      </div>
                    </Group>

                    <Divider />
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="commonAreas">
            <CommonAreaList buildingId={building.id} />
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
