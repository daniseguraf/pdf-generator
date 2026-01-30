import { AmenitiesValues, PropertyTypeValues } from '@my-buildings/shared/index'
import { z } from 'zod'

export const buildingFormSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(1),
  district: z.string().min(1),
  city: z.string().min(1),
  province: z.string().min(1),
  // managerId: z.string().min(1),
  propertyType: z.enum([
    PropertyTypeValues.RESIDENTIAL,
    PropertyTypeValues.COMMERCIAL,
    PropertyTypeValues.MIXED,
  ]),
  yearBuilt: z
    .number('Required, expected a number')
    .min(1800)
    .max(new Date().getFullYear()),
  floors: z.number('Required, expected a number').min(1).max(300),
})

export const amenitiesOptions = [
  { value: AmenitiesValues.PARKING, label: 'Parking' },
  { value: AmenitiesValues.SECURITY_24_7, label: '24/7 Security' },
  { value: AmenitiesValues.ELEVATOR, label: 'Elevator' },
  {
    value: AmenitiesValues.WHEELCHAIR_ACCESS,
    label: 'Wheelchair Access',
  },
  {
    value: AmenitiesValues.WHEELCHAIR_LIFT,
    label: 'Wheelchair Lift',
  },
  { value: AmenitiesValues.FIRE_ALARM, label: 'Fire Alarm' },
  { value: AmenitiesValues.CAMERAS, label: 'Security Cameras' },
]
