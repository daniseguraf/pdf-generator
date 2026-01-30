import type { Building } from '@my-buildings/shared'

export type BuildingCardInfoProps = Pick<
  Building,
  | 'id'
  | 'propertyType'
  | 'isActive'
  | 'name'
  | 'address'
  | 'district'
  | 'city'
  | 'province'
  | 'description'
>
