import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Stack,
  Center,
  Box,
} from '@mantine/core'
import {
  BuildingApartmentIcon,
  LockIcon,
  EnvelopeIcon,
} from '@phosphor-icons/react'
import { useForm } from '@mantine/form'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { loginFormSchema } from './LoginPage.helpers'
import type { LoginUserDto } from '@features/auth/types/auth.types'
import { useLogin } from '@features/auth/hooks/mutations/useLogin'

export const LoginPage = () => {
  const { mutate: login, isPending: isLoginPending } = useLogin()

  const form = useForm<LoginUserDto>({
    validateInputOnBlur: true,
    validate: zod4Resolver(loginFormSchema),
    initialValues: {
      email: '',
      password: '',
    },
  })

  const handleLogin = () => {
    if (form.validate().hasErrors) return

    login(form.values)
  }

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container w={500}>
        <Center mb="xl">
          <Group gap="xs">
            <BuildingApartmentIcon size={40} color="white" />
            <Title order={1} c="white">
              My Buildings
            </Title>
          </Group>
        </Center>

        <Paper radius="md" p="xl" withBorder shadow="xl">
          <Title order={2} ta="center" mb="md">
            Sign In
          </Title>

          <form onSubmit={form.onSubmit(handleLogin)}>
            <Stack gap="md">
              <TextInput
                label="Email"
                placeholder="yourEmail@email.com"
                leftSection={<EnvelopeIcon size={18} />}
                size="md"
                withAsterisk
                {...form.getInputProps('email')}
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                leftSection={<LockIcon size={18} />}
                size="md"
                withAsterisk
                {...form.getInputProps('password')}
              />

              {/* TODO: Add forgot password functionality */}
              {/* <Group justify="space-between" mt="xs">
                <Anchor
                  component="button"
                  type="button"
                  c="dimmed"
                  size="sm"
                  onClick={() => {}}
                >
                  Forgot your password?
                </Anchor>
              </Group> */}

              <Button
                fullWidth
                size="md"
                type="submit"
                loading={isLoginPending}
              >
                Sign In
              </Button>
            </Stack>
          </form>

          {/* TODO: Add register functionality */}
          {/* <Divider label="Or" labelPosition="center" my="lg" />

          <Text c="dimmed" size="sm" ta="center">
            Don't have an account?{' '}
            <Anchor size="sm" onClick={() => navigate('/signup')}>
              Create account
            </Anchor>
          </Text> */}
        </Paper>

        <Text c="white" size="xs" ta="center" mt="xl" opacity={0.8}>
          © 2026 My Buildings. Real estate management system.
        </Text>
      </Container>
    </Box>
  )
}
