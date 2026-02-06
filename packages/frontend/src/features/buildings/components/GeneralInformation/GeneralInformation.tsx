import type { GeneralInformationProps } from '@features/buildings/components/GeneralInformation/GeneralInformationProps.types'
import {
  Text,
  Group,
  Card,
  Stack,
  Grid,
  ThemeIcon,
  Avatar,
} from '@mantine/core'

import {
  BuildingOfficeIcon,
  CalendarIcon,
  EnvelopeIcon,
  PhoneIcon,
  UsersIcon,
} from '@phosphor-icons/react'

export const GeneralInformation = ({
  floors,
  yearBuilt,
  manager,
  phoneNumber,
  email,
}: GeneralInformationProps) => {
  return (
    <Grid gutter="lg">
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            {floors && (
              <Group>
                <ThemeIcon size="xl" variant="light" color="blue">
                  <BuildingOfficeIcon size={24} />
                </ThemeIcon>
                <div>
                  <Text size="sm" c="dimmed">
                    Floors
                  </Text>
                  <Text size="xl">{floors}</Text>
                </div>
              </Group>
            )}

            {yearBuilt && (
              <Group>
                <ThemeIcon size="xl" variant="light" color="teal">
                  <CalendarIcon size={24} />
                </ThemeIcon>
                <div>
                  <Text size="sm" c="dimmed">
                    Year Built
                  </Text>
                  <Text size="xl">{yearBuilt}</Text>
                </div>
              </Group>
            )}

            {phoneNumber && (
              <Group>
                <ThemeIcon size="xl" variant="light" color="teal">
                  <PhoneIcon size={24} />
                </ThemeIcon>
                <div>
                  <Text size="sm" c="dimmed">
                    Phone Number
                  </Text>
                  <Text size="xl">{phoneNumber}</Text>
                </div>
              </Group>
            )}

            {email && (
              <Group>
                <ThemeIcon size="xl" variant="light" color="teal">
                  <EnvelopeIcon size={24} />
                </ThemeIcon>
                <div>
                  <Text size="sm" c="dimmed">
                    Email
                  </Text>
                  <Text size="xl">{email}</Text>
                </div>
              </Group>
            )}
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
                  Responsible Manager
                </Text>
                <Text size="lg">
                  {manager?.firstName} {manager?.lastName}
                </Text>
              </div>
            </Group>
          </Stack>
        </Card>
      </Grid.Col>
    </Grid>
  )
}
