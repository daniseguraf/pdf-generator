import { useAuthContext } from '@features/auth/hooks/useAuthContext'
import type { LoginUserDto } from '@features/auth/types/auth.types'
import { notifications } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

export const useLogin = () => {
  const { login } = useAuthContext()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials: LoginUserDto) => {
      return login(credentials)
    },
    onSuccess: () => {
      notifications.show({
        title: 'Login successful',
        message: 'You are now logged in',
        color: 'green',
      })
      navigate('/')
    },
    onError: error => {
      notifications.show({
        title: 'Error logging in',
        message: error.message,
        color: 'red',
      })
    },
  })
}
