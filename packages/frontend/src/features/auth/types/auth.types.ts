import type { components } from '@my-buildings/shared/index'
import type { ReactNode } from 'react'

export type RegisterUserDto = components['schemas']['RegisterUserDto']
export type LoginUserDto = components['schemas']['LoginUserDto']
export type AuthResponse = components['schemas']['AuthResponse']

export type AuthenticatedUser = Omit<AuthResponse, 'accessToken'>

export interface AuthContextType {
  login: (credentials: LoginUserDto) => Promise<void>
  logout: () => void
  user: AuthenticatedUser | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface AuthProviderProps {
  children: ReactNode
}
