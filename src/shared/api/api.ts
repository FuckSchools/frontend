import type z from 'zod'
import { CONFIG } from '../config/constant'
import { useAuthToken } from './auth'

export interface Api {
  get: <T extends z.ZodType>(
    path: string,
    parser: T,
    body?: any,
  ) => Promise<z.infer<T>>
  post: <T extends z.ZodType>(
    path: string,
    parser: T,
    body?: any,
  ) => Promise<z.infer<T>>
}

export class useApi implements Api {
  async get<T extends z.ZodType>(
    path: string,
    parser: T,
    body?: any,
  ): Promise<z.infer<T>> {
    const token = await useAuthToken()
    const response = await fetch(`${CONFIG.BACKEND_URL}/${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    const parsed = parser.safeParse(data)
    if (!parsed.success) {
      throw new Error('Failed to parse data')
    }
    return parsed.data
  }
  async post<T extends z.ZodType>(
    path: string,
    parser: T,
    body?: any,
  ): Promise<z.infer<T>> {
    const token = await useAuthToken()
    const response = await fetch(`${CONFIG.BACKEND_URL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    const parsed = parser.safeParse(data)
    if (!parsed.success) {
      throw new Error('Failed to parse data')
    }
    return parsed.data
  }
}

export class usePublicApi implements Api {
  async get<T extends z.ZodType>(
    path: string,
    parser: T,
    body?: any,
  ): Promise<z.infer<T>> {
    const response = await fetch(`${CONFIG.BACKEND_URL}/${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    const parsed = parser.safeParse(data)
    if (!parsed.success) {
      throw new Error('Failed to parse data')
    }
    return parsed.data
  }
  async post<T extends z.ZodType>(
    path: string,
    parser: T,
    body?: any,
  ): Promise<z.infer<T>> {
    const response = await fetch(`${CONFIG.BACKEND_URL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    const parsed = parser.safeParse(data)
    if (!parsed.success) {
      throw new Error('Failed to parse data')
    }
    return parsed.data
  }
}
