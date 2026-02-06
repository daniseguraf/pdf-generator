import type { User } from '@my-buildings/shared'

export interface GeneralInformationProps {
  floors?: number
  yearBuilt?: number
  manager?: User
  phoneNumber: string | null
  email: string | null
}
