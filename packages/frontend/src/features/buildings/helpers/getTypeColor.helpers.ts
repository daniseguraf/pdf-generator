import { PropertyTypeValues } from '@my-buildings/shared/types/prisma.types'

export const getTypeColor = (type: string): string => {
  switch (type) {
    case PropertyTypeValues.COMMERCIAL:
      return 'blue'
    case PropertyTypeValues.RESIDENTIAL:
      return 'violet'
    case PropertyTypeValues.MIXED:
      return 'teal'
    default:
      return 'gray'
  }
}
