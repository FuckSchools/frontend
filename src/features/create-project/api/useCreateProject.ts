import { getProjects } from '#/entities/project/api/getProjects'
import { useMutation } from '@tanstack/react-query'

export const useCreateProject = useMutation({
  ...getProjects.create,
})
