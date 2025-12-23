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
  Loader,
  Box,
  Badge,
  Title,
  Avatar,
  Divider,
} from '@mantine/core'
import {
  BuildingOfficeIcon,
  CalendarIcon,
  CaretDoubleLeftIcon,
  CheckIcon,
  PencilIcon,
  StackIcon,
  UserIcon,
  MapPinIcon,
  UsersIcon,
} from '@phosphor-icons/react'

import { useBuilding } from '@features/buildings/hooks/queries/useBuilding'
import { PropertyTypeValues } from '@my-buildings/shared/types/prisma.types'
import { BuildingForm } from '@features/buildings/components/BuildingForm/BuildingForm'
import { useDisclosure } from '@mantine/hooks'

const amenitiesOptions = [
  'Estacionamiento',
  'Seguridad 24/7',
  'Gimnasio',
  'Alberca',
  'Jardín',
  'Sala de juntas',
  'Cafetería',
  'Internet de alta velocidad',
  'Elevadores',
  'Salón de eventos',
  'Área de juegos',
  'Rooftop',
  'Coworking',
  'Pet-friendly',
]

export const BuildingDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [opened, { open, close }] = useDisclosure(false)

  const { data: building, isLoading } = useBuilding(Number(id))

  const handleEditBuilding = () => {}

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
      {isLoading ? (
        <Loader />
      ) : (
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
                      {building.propertyType}
                    </Badge>
                    <Badge
                      color={building.isActive ? 'green' : 'red'}
                      variant="dot"
                      size="lg"
                    >
                      {building.isActive ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </Group>

                  <Title order={1} mb="xs">
                    {building.name}
                  </Title>

                  <Group gap="xs">
                    <MapPinIcon size={18} />
                    <Text c="dimmed">
                      {building.address}, {building.district} - {building.city},{' '}
                      {building.province}
                    </Text>
                  </Group>
                </div>
              </Group>

              <Text c="dimmed" mt="md">
                {building.description}
              </Text>
            </Box>
          </Paper>

          <Tabs defaultValue="general" variant="outline">
            <Tabs.List mb="xl">
              <Tabs.Tab
                value="general"
                leftSection={<BuildingOfficeIcon size={18} />}
              >
                Información General
              </Tabs.Tab>

              <Tabs.Tab value="amenities" leftSection={<CheckIcon size={18} />}>
                Amenidades
              </Tabs.Tab>
              <Tabs.Tab value="contact" leftSection={<UserIcon size={18} />}>
                Contacto
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
                          <Text size="xl">{building.floors}</Text>
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
                          {/* <Text size="xl">{building.units}</Text> */}
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
                          <Text size="xl">{building.yearBuilt}</Text>
                        </div>
                      </Group>
                    </Stack>
                  </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    h="100%"
                  >
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
                            {building.manager?.firstName}{' '}
                            {building.manager?.lastName}
                          </Text>
                        </div>
                      </Group>

                      <Divider />
                    </Stack>
                  </Card>
                </Grid.Col>
              </Grid>
            </Tabs.Panel>

            {/* <Tabs.Panel value="amenities">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3} mb="lg">
              Amenidades Disponibles
            </Title>
            <List
              spacing="md"
              icon={
                <ThemeIcon color="teal" size={24} radius="xl">
                  <Check size={16} />
                </ThemeIcon>
              }
            >
              {building.amenities.map((amenity, index) => (
                <List.Item key={index}>
                  <Text>{amenity}</Text>
                </List.Item>
              ))}
            </List>
          </Card>
        </Tabs.Panel> */}

            {/* <Tabs.Panel value="contact">
          <Grid gutter="lg">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="lg">
                  Información de Contacto
                </Title>
                <Stack gap="lg">
                  <Group>
                    <ThemeIcon size="xl" variant="light" color="blue">
                      <Mail size={24} />
                    </ThemeIcon>
                    <div>
                      <Text size="sm" c="dimmed">
                        Email
                      </Text>
                      <Text>{building.contact.email}</Text>
                    </div>
                  </Group>

                  <Group>
                    <ThemeIcon size="xl" variant="light" color="green">
                      <Phone size={24} />
                    </ThemeIcon>
                    <div>
                      <Text size="sm" c="dimmed">
                        Teléfono
                      </Text>
                      <Text>{building.contact.phone}</Text>
                    </div>
                  </Group>

                  <Group>
                    <ThemeIcon size="xl" variant="light" color="violet">
                      <User size={24} />
                    </ThemeIcon>
                    <div>
                      <Text size="sm" c="dimmed">
                        Manager Responsable
                      </Text>
                      <Text>{building.manager}</Text>
                    </div>
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="lg">
                  Ubicación
                </Title>
                <Group mb="md">
                  <ThemeIcon size="xl" variant="light" color="red">
                    <MapPin size={24} />
                  </ThemeIcon>
                  <div>
                    <Text size="sm" c="dimmed">
                      Dirección
                    </Text>
                    <Text>{building.address}</Text>
                  </div>
                </Group>
              </Card>
            </Grid.Col>
          </Grid>
        </Tabs.Panel> */}
          </Tabs>
        </Container>
      )}

      <BuildingForm
        opened={opened}
        onClose={close}
        initialValues={building}
        isEdit
      />
    </>
  )
}
