import { PropertyTypeValues } from '@my-buildings/shared/index'
import { z } from 'zod'

export const buildingFormSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(1),
  district: z.string().min(1),
  city: z.string().min(1),
  province: z.string().min(1),
  postalCode: z.string().optional(),
  managerId: z.string().min(1),
  propertyType: z.enum([
    PropertyTypeValues.RESIDENTIAL,
    PropertyTypeValues.COMMERCIAL,
    PropertyTypeValues.MIXED,
  ]),
  yearBuilt: z.number().min(1800).max(new Date().getFullYear()),
  floors: z.number().min(1).max(300),
  phoneNumber: z.string().optional(),
  email: z.email().optional(),
  description: z.string().optional(),
})
