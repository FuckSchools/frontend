import { auth } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'

export const useAuthToken = async (): Promise<string> => {
  const token = await (await auth()).getToken()
  if (!token) {
    throw new Error('Cannot get auth token')
  }
  return token
}

export const useAuth = createServerFn().handler(async () => {
  const { isAuthenticated, userId } = await auth()
  return { isAuthenticated, userId }
})
