import z from 'zod'

export const projectSchema = z.object({
  title: z.string(),
  updatedAt: z.date(),
})

export type Project = z.infer<typeof projectSchema>

export const createProjectSchema = z.object({
  title: z.string().nonempty(),
})
