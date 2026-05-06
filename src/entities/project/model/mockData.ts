import type z from 'zod'
import type { projectSchema } from './projectSchema'

export const projects: z.infer<typeof projectSchema>[] = [
  {
    title: 'Project 1',
    updatedAt: new Date(),
  },
  {
    title: 'Project 2',
    updatedAt: new Date(),
  },
]
