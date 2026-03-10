import axios from 'axios'

// Add to the beginning of the axios.ts file
declare module 'axios' {
  export interface AxiosRequestConfig {
    metadata?: {
      operationName?: string
    }
  }
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.request.use(
  config => {
    if (config.metadata?.operationName) {
      config.headers['X-Operation-Name'] = config.metadata.operationName
    }

    return config
  },

  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => response,
  error => {
    const isAuthCheck = error.config?.url?.includes('/auth/me')

    if (error.response?.status === 401 && !isAuthCheck) {
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)
