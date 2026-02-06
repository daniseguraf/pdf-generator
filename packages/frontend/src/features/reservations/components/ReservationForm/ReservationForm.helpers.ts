import { z } from 'zod'

export const reservationFormSchema = z.object({
  title: z.string().optional(),
  notes: z.string().optional(),
  attendees: z.coerce
    .number({
      error: 'Attendees is required',
    })
    .min(1, 'Attendees must be at least 1'),
})
