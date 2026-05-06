import { Badge } from '#/components/ui/badge'
import { Card, CardContent } from '#/components/ui/card'
import type { Project } from '../model/projectSchema'

export function ProjectPreview({ project }: { project: Project }) {
  return (
    <Card>
      <CardContent>
        <div className="flex-row items-center justify-between">
          <p>{project.title}</p>
          <Badge variant="default">
            {project.updatedAt.toLocaleDateString()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
