import type { CommonArea } from '@my-buildings/shared/index'

export type CommonAreaCardProps = Omit<
  CommonArea,
  'buildingId' | 'updatedAt' | 'deletedAt' | 'createdAt'
> & {
  onDelete?: () => void
  onEdit?: () => void
  withActions?: boolean
}
