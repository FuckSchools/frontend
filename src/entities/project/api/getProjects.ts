import { useApi } from '#/shared/api/api'
import { createServerFn } from '@tanstack/react-start'
import { projectSchema  } from '../model/projectSchema'
import type {createProjectSchema} from '../model/projectSchema';
import { mutationOptions } from '@tanstack/react-query'
import type z from 'zod'
import { createProject } from './createProject'

export const getProjectsApi = createServerFn({ method: 'GET' }).handler(
  async () => {
    const api = new useApi()
    const projects = await api.get('/projects', projectSchema.array())
    return projects
  },
)

export const getProjects = {
  listAll: () => ['projects'] as const,
  create: (data: z.infer<typeof createProjectSchema>) =>
    mutationOptions({
      mutationKey: [...getProjects.listAll(), data],
      mutationFn: async () => createProject({ data }),
    }),
}
