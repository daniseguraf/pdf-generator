import type {
  AuthResponse,
  LoginUserDto,
  RegisterUserDto,
} from '@features/auth/types/auth.types'
import { api } from '@lib/axios'
import type { User } from '@my-buildings/shared/index'

export const authService = {
  register: async (registerUserDto: RegisterUserDto): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', registerUserDto)
    return response.data
  },

  login: async (loginUserDto: LoginUserDto): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', loginUserDto)
    return response.data
  },

  me: async (): Promise<User> => {
    const response = await api.get('/auth/me')
    return response.data
  },
}
