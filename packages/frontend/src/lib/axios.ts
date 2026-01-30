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
})

// Request Interceptor - Automatically add JWT token
api.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    if (config.metadata?.operationName) {
      config.headers['X-Operation-Name'] = config.metadata.operationName
    }

    return config
  },

  error => Promise.reject(error)
)

// Response Interceptor - Error handling and refresh token
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
