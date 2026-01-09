import type {
  Amenities,
  Building,
  components,
  PropertyType,
} from '@my-buildings/shared/index'

export type CreateBuildingDto = components['schemas']['CreateBuildingDto']
export type UpdateBuildingDto = components['schemas']['UpdateBuildingDto']

export type BuildingFormProps = {
  opened: boolean
  onClose: () => void
  building?: Building
  isEdit?: boolean
}

export type BuildingFormValues = {
  name: string
  address: string
  district: string
  city: string
  province: string
  postalCode?: string
  propertyType: PropertyType
  yearBuilt: number | string
  floors: number | string
  phoneNumber?: string
  email?: string
  description?: string
  amenities: Amenities[]
}
