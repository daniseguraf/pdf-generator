import { AuthContext } from '@features/auth/context/auth-context'
import { authService } from '@features/auth/services/auth.service'
import type {
  AuthenticatedUser,
  AuthProviderProps,
  LoginUserDto,
} from '@features/auth/types/auth.types'
import { useEffect, useState } from 'react'

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const login = async (credentials: LoginUserDto) => {
    const response = await authService.login(credentials)

    if (!response) {
      throw new Error('Failed to login')
    }

    localStorage.setItem('accessToken', response.accessToken)

    setUser({
      id: response.id,
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
    })
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    setUser(null)
    window.location.href = '/login'
  }

  const isAuthenticated = !!user

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken')

      if (token) {
        try {
          const userData = await authService.me()

          setUser({
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
          })
        } catch (error) {
          console.error('Error al obtener el usuario', error)
          localStorage.removeItem('accessToken')
          setUser(null)
        } finally {
          setIsLoading(false)
        }
      } else {
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
