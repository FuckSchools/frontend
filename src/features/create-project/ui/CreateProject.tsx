import { Button } from '#/components/ui/button'
import { Card, CardContent, CardTitle } from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { useRef } from 'react'
import { createProject } from '../../../entities/project/api/createProject'
import { useCreateProject } from '../api/useCreateProject'

async function handleCreateProject(
  e: React.MouseEvent<HTMLButtonElement>,
  title: string,
) {
  e.preventDefault()
  await useCreateProject.mutateAsync()
}

export function CreateProject() {
  const projectProperties = useRef<string>('')
  return (
    <Card>
      <CardTitle>Create Project</CardTitle>
      <CardContent>
        <div className="flex flex-col content-start items-start gap-2">
          <Label htmlFor="title">Input your title</Label>
          <Input
            id="title"
            placeholder="Project Title"
            onChange={(event) =>
              (projectProperties.current = event.target.value)
            }
          />
          <Button
            className="self-end"
            onClick={(e) => handleCreateProject(e, projectProperties.current)}
          >
            Create
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
