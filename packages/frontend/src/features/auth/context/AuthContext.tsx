import { AuthContext } from '@features/auth/context/auth-context'
import { authService } from '@features/auth/services/auth.service'
import type {
  AuthenticatedUser,
  AuthProviderProps,
  LoginUserDto,
} from '@features/auth/types/auth.types'
import { notifications } from '@mantine/notifications'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const login = async (credentials: LoginUserDto) => {
    const response = await authService.login(credentials)

    if (!response) {
      throw new Error('Failed to login')
    }

    setUser({
      id: response.id,
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
      role: response.role,
    })
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      notifications.show({
        title: 'Error logging out',
        message: error instanceof Error ? error.message : 'Unknown error',
        color: 'red',
      })
    } finally {
      setUser(null)
      window.location.href = '/login'
    }
  }

  const isAuthenticated = !!user

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = await authService.me()

        setUser({
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          role: userData.role,
        })
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status !== 401) {
          console.error('Error fetching user', error)
        }

        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
