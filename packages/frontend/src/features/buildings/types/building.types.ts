import type {
  Amenities,
  Building,
  components,
  PropertyType,
} from '@my-buildings/shared/index'

export type CreateBuildingDto = components['schemas']['CreateBuildingDto']
export type UpdateBuildingDto = components['schemas']['UpdateBuildingDto']

export interface BuildingFormProps {
  opened: boolean
  onClose: () => void
  building?: Building
  isEdit?: boolean
}

export interface BuildingFormValues {
  name: string
  address: string
  district: string
  city: string
  province: string
  postalCode?: string
  propertyType: PropertyType
  yearBuilt?: number
  floors?: number
  phoneNumber?: string
  email?: string
  description?: string
  amenities: Amenities[]
}
