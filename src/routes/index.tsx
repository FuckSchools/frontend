import { UserState } from '#/entities/user/ui/UserState';
import { useApi } from '#/shared/api/api'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
  beforeLoad: async () =>
  {

  },
  loader: async () => {
    const result = await useApi()
    return { data: result }
  },
})

function Home() {
  const { data } = Route.useLoaderData()
  return (
    <div className="p-8">
      {data ? (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-2xl font-semibold">API Data:</h2>
          <pre className="mt-2 bg-gray-200 p-2 rounded overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ): (
        <div className="mt-4 p-4 bg-yellow-100 rounded">
          <p className="text-lg">Loading API data...</p>
        </div>
      ) }
      <UserState />
    </div>
  )
}
