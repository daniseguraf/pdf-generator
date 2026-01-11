import axios from 'axios'

// Agregar al inicio del archivo axios.ts
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

//Request Interceptor - Agregar token JWT automáticamente
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (config.metadata?.operationName) {
      config.headers['X-Operation-Name'] = config.metadata.operationName
    }

    return config
  },
  error => Promise.reject(error)
)

//Response Interceptor - Manejo de errores y refresh token
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
