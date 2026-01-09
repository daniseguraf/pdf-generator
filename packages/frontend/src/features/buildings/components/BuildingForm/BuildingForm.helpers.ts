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
  yearBuilt: z.number().min(1800).max(new Date().getFullYear()),
  floors: z.number().min(1).max(300),
})

export const amenitiesOptions = [
  { value: AmenitiesValues.PARKING, label: 'Estacionamiento' },
  { value: AmenitiesValues.SECURITY_24_7, label: 'Seguridad 24/7' },
  { value: AmenitiesValues.ELEVATOR, label: 'Elevador' },
  {
    value: AmenitiesValues.WHEELCHAIR_ACCESS,
    label: 'Acceso para sillas de ruedas',
  },
  {
    value: AmenitiesValues.WHEELCHAIR_LIFT,
    label: 'Ascensor para sillas de ruedas',
  },
  { value: AmenitiesValues.FIRE_ALARM, label: 'Alarma de incendio' },
  { value: AmenitiesValues.CAMERAS, label: 'Cámaras de seguridad' },
]
