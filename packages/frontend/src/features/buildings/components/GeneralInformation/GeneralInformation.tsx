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
  StackIcon,
  UsersIcon,
} from '@phosphor-icons/react'

export const GeneralInformation = ({
  floors,
  yearBuilt,
  manager,
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

            <Group>
              <ThemeIcon size="xl" variant="light" color="violet">
                <StackIcon size={24} />
              </ThemeIcon>
              <div>
                <Text size="sm" c="dimmed">
                  Units
                </Text>
                <Text size="xl">100</Text>
              </div>
            </Group>

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
