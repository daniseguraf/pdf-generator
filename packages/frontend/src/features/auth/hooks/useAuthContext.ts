import { useContext } from 'react'
import { AuthContext } from '@features/auth/context/auth-context'

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }

  return context
}
