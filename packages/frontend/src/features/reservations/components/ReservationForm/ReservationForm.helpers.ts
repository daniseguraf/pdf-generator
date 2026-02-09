import { z } from 'zod'

export const getReservationFormSchema = (capacity: number) =>
  z.object({
    title: z.string().optional(),
    notes: z.string().optional(),
    attendees: z.coerce
      .number({
        error: 'Attendees is required',
      })
      .min(1, 'Attendees must be at least 1')
      .max(
        capacity,
        `Attendees cannot exceed the capacity of ${capacity} people`
      ),
  })
