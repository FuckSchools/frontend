import {
  createProjectSchema,
  projectSchema,
} from '#/entities/project/model/projectSchema'
import { useApi } from '#/shared/api/api'
import { createServerFn } from '@tanstack/react-start'
import type z from 'zod'

export const createProject = createServerFn({ method: 'POST' })
  .inputValidator(createProjectSchema)
  .handler(async ({ data }): Promise<z.infer<typeof projectSchema>> => {
    const api = new useApi()
    const project = await api.post('/projects', projectSchema, {
      title: data.title,
    })
    return project
  })
