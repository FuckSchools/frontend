import { auth } from '@clerk/tanstack-react-start/server'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: (ctx) => {
    if (ctx.context.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
