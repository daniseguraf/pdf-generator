import z from 'zod'

export const loginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
})
