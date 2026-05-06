import { projects } from '#/entities/project/model/mockData'
import { ProjectPreview } from '#/entities/project/ui/ProjectPreview'
import { Navbar } from '#/shared/ui/Navbar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
  loader: async ({ context }) => {
    return context.isAuthenticated
  },
})

function Home() {
  return (
    <>
      <div className="p-8">
        <div className="m-10">
          {projects.map((project, idx) => {
            return <ProjectPreview project={project} key={idx} />
          })}
        </div>
      </div>
    </>
  )
}
