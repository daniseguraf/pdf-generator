export enum PropertyType {
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL = 'COMMERCIAL',
  MIXED = 'MIXED',
}

export interface Building {
  id: number
  name: string
  description?: string
  yearBuilt: number
  propertyType: PropertyType
  address: string
  district: string
  city: string
  province: string
  postalCode?: string
  floors: number
  phoneNumber?: string
  email?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface CreateBuildingDto {
  name: string
  description?: string
  yearBuilt: number
  propertyType: PropertyType
  address: string
  district: string
  city: string
  province: string
  postalCode?: string
  floors: number
  phoneNumber?: string
  email?: string
}
