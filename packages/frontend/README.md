# 🏗️ Arquitectura Frontend - Sistema de Gestión de Edificios

## 📋 Tabla de Contenidos

- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura General](#arquitectura-general)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Flujo de Datos](#flujo-de-datos)
- [Patrones de Diseño](#patrones-de-diseño)
- [Convenciones](#convenciones)

---

## 🛠️ Stack Tecnológico

| Capa                 | Tecnología     | Versión | Propósito              |
| -------------------- | -------------- | ------- | ---------------------- |
| **Framework**        | React          | 18.x    | Librería UI            |
| **Lenguaje**         | TypeScript     | 5.x     | Type safety            |
| **Build Tool**       | Vite           | 5.x     | Bundler y dev server   |
| **UI Library**       | Mantine        | 7.x     | Sistema de componentes |
| **Routing**          | React Router   | 6.x     | Navegación SPA         |
| **State Management** | TanStack Query | 5.x     | Server state           |
| **HTTP Client**      | Axios          | 1.x     | Peticiones API         |
| **Icons**            | Lucide React   | -       | Iconografía            |
| **Date Utils**       | Day.js         | -       | Manejo de fechas       |

---

## 🏛️ Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                     React Application                      │  │
│  │                                                             │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              Presentation Layer                      │  │  │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │  │  │
│  │  │  │  Pages   │  │Components│  │ Layouts  │          │  │  │
│  │  │  └────┬─────┘  └────┬─────┘  └────┬─────┘          │  │  │
│  │  └───────┼─────────────┼─────────────┼────────────────┘  │  │
│  │          │             │             │                     │  │
│  │  ┌───────▼─────────────▼─────────────▼────────────────┐  │  │
│  │  │              Business Logic Layer                   │  │  │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐         │  │  │
│  │  │  │  Hooks   │  │   State  │  │  Utils   │         │  │  │
│  │  │  │  Custom  │  │  (Query) │  │          │         │  │  │
│  │  │  └────┬─────┘  └────┬─────┘  └──────────┘         │  │  │
│  │  └───────┼─────────────┼────────────────────────────┘  │  │
│  │          │             │                                 │  │
│  │  ┌───────▼─────────────▼────────────────────────────┐  │  │
│  │  │              Data Access Layer                    │  │  │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐       │  │  │
│  │  │  │ Services │  │  Axios   │  │  Cache   │       │  │  │
│  │  │  │   API    │  │  Client  │  │ (Query)  │       │  │  │
│  │  │  └────┬─────┘  └────┬─────┘  └──────────┘       │  │  │
│  │  └───────┼─────────────┼────────────────────────────┘  │  │
│  └──────────┼─────────────┼─────────────────────────────────┘  │
│             │             │                                     │
│             │             │                                     │
└─────────────┼─────────────┼─────────────────────────────────────┘
              │             │
              ▼             ▼
    ┌─────────────────────────────────┐
    │       NestJS Backend API        │
    │     http://localhost:3000       │
    └─────────────────────────────────┘
```

---

## 📁 Estructura de Carpetas

```
src/
├── 🎯 app/                      # Configuración de la aplicación
│   ├── providers/               # Context providers (Query, Mantine, Auth)
│   ├── router/                  # Configuración de rutas
│   └── App.tsx
│
├── 🎨 features/                 # Módulos por funcionalidad (Feature-First)
│   ├── auth/
│   │   ├── components/          # UI específica de auth
│   │   ├── hooks/               # useAuth, useLogin, etc.
│   │   ├── services/            # API calls de auth
│   │   ├── types/               # Types de auth
│   │   └── pages/               # LoginPage, RegisterPage
│   │
│   ├── buildings/
│   │   ├── components/          # BuildingForm, BuildingTable, etc.
│   │   ├── hooks/               # useBuildings, useCreateBuilding
│   │   ├── services/            # buildings.service.ts
│   │   ├── types/               # building.types.ts
│   │   └── pages/               # BuildingsListPage, BuildingDetailPage
│   │
│   ├── units/                   # Gestión de unidades
│   ├── bookings/                # Sistema de reservas
│   ├── tickets/                 # Sistema de incidencias
│   ├── staff/                   # Gestión de personal
│   └── dashboard/               # Dashboard y métricas
│
├── 🧩 components/               # Componentes compartidos/reutilizables
│   ├── ui/                      # Wrappers de Mantine
│   │   ├── DataTable/
│   │   ├── FormModal/
│   │   └── ConfirmDialog/
│   ├── layout/                  # Layouts de página
│   │   ├── AppShell/
│   │   ├── PageHeader/
│   │   └── EmptyState/
│   └── common/                  # Componentes comunes
│       ├── ErrorBoundary/
│       └── LoadingSpinner/
│
├── 🪝 hooks/                    # Hooks compartidos globalmente
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   └── usePagination.ts
│
├── 📚 lib/                      # Configuraciones de librerías
│   ├── axios.ts                 # Instancia + interceptors
│   ├── queryClient.ts           # Config de React Query
│   └── mantine-theme.ts         # Tema customizado
│
├── 🔧 services/                 # Servicios compartidos
│   ├── api.ts                   # Funciones base de API
│   └── storage.ts               # LocalStorage helpers
│
├── 📝 types/                    # Types globales
│   ├── api.types.ts
│   ├── common.types.ts
│   └── models.types.ts
│
├── 🛠️ utils/                    # Utilidades
│   ├── format.ts                # Formateo de datos
│   ├── validation.ts            # Validaciones
│   └── constants.ts             # Constantes
│
├── 🎨 styles/                   # Estilos globales
│   └── global.css
│
└── 📦 assets/                   # Assets estáticos
    ├── images/
    └── icons/
```

---

## 🔄 Flujo de Datos

### 1. Lectura de Datos (Query)

```
┌──────────────┐
│   Usuario    │
│  hace click  │
└──────┬───────┘
       │
       ▼
┌─────────────────────┐
│  BuildingsListPage  │  (Page Component)
│  useBuildings()     │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  useBuildings hook  │  (Custom Hook)
│  + React Query      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ buildings.service   │  (Service Layer)
│ buildingsService    │
│   .getAll()         │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   Axios Client      │  (HTTP Layer)
│  GET /buildings     │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   Backend API       │
│   NestJS + Prisma   │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   PostgreSQL DB     │
└─────────────────────┘

Response Flow (inverso):
DB → Backend → Axios → Service → React Query Cache → Hook → Component → UI
```

### 2. Escritura de Datos (Mutation)

```
┌──────────────┐
│   Usuario    │
│  submit form │
└──────┬───────┘
       │
       ▼
┌─────────────────────┐
│   BuildingForm      │  (Form Component)
│  mutation.mutate()  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│useCreateBuilding    │  (Custom Hook)
│  + React Query      │
│  useMutation()      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│buildings.service    │  (Service Layer)
│  .create(dto)       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   Axios Client      │  (HTTP Layer)
│  POST /buildings    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   Backend API       │
└──────┬──────────────┘
       │
       ▼ (Success)
┌─────────────────────┐
│  Query Invalidation │  React Query invalida cache
│  + Refetch          │  UI se actualiza automáticamente
└─────────────────────┘
```

### 3. Autenticación (JWT)

```
┌──────────┐
│  Login   │
└────┬─────┘
     │
     ▼
POST /auth/login
     │
     ▼
┌──────────────────┐
│  Backend retorna │
│  { access_token }│
└────┬─────────────┘
     │
     ▼
┌──────────────────────┐
│ localStorage.setItem │
│ ('access_token', ..) │
└────┬─────────────────┘
     │
     ▼
┌──────────────────────────┐
│ Axios Request Interceptor│
│ Agrega header:           │
│ Authorization: Bearer ..  │
└──────────────────────────┘
     │
     ▼
Todas las requests incluyen token automáticamente
```

---

## 🎯 Patrones de Diseño

### 1. Feature-First Architecture

Cada módulo de negocio es autocontenido:

```
features/buildings/
├── components/     # UI solo para buildings
├── hooks/         # Lógica solo para buildings
├── services/      # API calls solo para buildings
├── types/         # Types solo para buildings
└── pages/         # Páginas de buildings

✅ Alta cohesión
✅ Bajo acoplamiento
✅ Fácil de escalar
```

### 2. Custom Hooks Pattern

Encapsular lógica de React Query en hooks reutilizables:

```typescript
// ❌ Evitar: React Query directo en componentes
function BuildingsPage() {
  const { data } = useQuery({
    queryKey: ['buildings'],
    queryFn: () => fetch('/buildings'),
  })
}

// ✅ Mejor: Custom hook
function BuildingsPage() {
  const { data, isLoading } = useBuildings()
}
```

### 3. Service Layer Pattern

Separar lógica de API de componentes:

```typescript
// services/buildings.service.ts
export const buildingsService = {
  getAll: () => api.get('/buildings'),
  create: dto => api.post('/buildings', dto),
  // ...
}

// hooks/useBuildings.ts
export const useBuildings = () => {
  return useQuery({
    queryKey: ['buildings'],
    queryFn: buildingsService.getAll,
  })
}
```

### 4. Compound Components

Para componentes complejos como tablas:

```typescript
<DataTable data={buildings}>
  <DataTable.Column field="name" header="Nombre" />
  <DataTable.Column field="address" header="Dirección" />
  <DataTable.Actions>
    <ActionButton icon="view" />
    <ActionButton icon="edit" />
  </DataTable.Actions>
</DataTable>
```

---

## 📐 Convenciones

### Nomenclatura de Archivos

```typescript
// Componentes
BuildingForm.tsx // PascalCase
BuildingTable.tsx

// Hooks
useBuildings.ts // camelCase + 'use' prefix
useCreateBuilding.ts

// Services
buildings.service.ts // camelCase + '.service'
auth.service.ts

// Types
building.types.ts // camelCase + '.types'
api.types.ts

// Utils
format.ts // camelCase
validation.ts
```

### Imports con Alias

```typescript
// ✅ Con alias (configurado en vite.config.ts)
import { api } from '@/lib/axios'
import { useBuildings } from '@/features/buildings/hooks/useBuildings'
import { DataTable } from '@/components/ui/DataTable'

// ❌ Sin alias (difícil de mantener)
import { api } from '../../../lib/axios'
import { useBuildings } from '../../features/buildings/hooks/useBuildings'
```

### Organización de Imports

```typescript
// 1. React y librerías externas
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button, Group } from '@mantine/core'

// 2. Imports internos (ordenados por cercanía)
import { useBuildings } from '@/features/buildings/hooks/useBuildings'
import { BuildingForm } from '../components/BuildingForm'
import { formatDate } from '@/utils/format'

// 3. Types
import type { Building } from '@/features/buildings/types/building.types'

// 4. Estilos (si aplica)
import './styles.css'
```

### TypeScript Guidelines

```typescript
// ✅ Interfaces para objetos de datos
interface Building {
  id: string
  name: string
}

// ✅ Types para unions, utilities
type BuildingStatus = 'active' | 'inactive'
type PartialBuilding = Partial<Building>

// ✅ Evitar 'any', usar 'unknown' si es necesario
const data: unknown = await fetchData()

// ✅ Props de componentes
interface BuildingFormProps {
  buildingId?: string
  onSuccess?: () => void
}
```

---

## 🔐 Seguridad

### Protección de Rutas

```typescript
// router/ProtectedRoute.tsx
<ProtectedRoute roles={['ADMIN', 'MANAGER']}>
  <BuildingsPage />
</ProtectedRoute>
```

### Manejo de Tokens

```typescript
// lib/axios.ts
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Refresh automático en 401
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirect a login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

---

## 🚀 Performance

### Code Splitting

```typescript
// Lazy loading de páginas
const BuildingsPage = lazy(() => import('@/features/buildings/pages/BuildingsListPage'));

<Route path="/buildings" element={
  <Suspense fallback={<LoadingSpinner />}>
    <BuildingsPage />
  </Suspense>
} />
```

### React Query Cache

```typescript
// lib/queryClient.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 10 * 60 * 1000, // 10 minutos
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
```

### Optimistic Updates

```typescript
const mutation = useMutation({
  mutationFn: updateBuilding,
  onMutate: async updatedBuilding => {
    // Actualizar UI inmediatamente
    await queryClient.cancelQueries(['buildings'])
    const previous = queryClient.getQueryData(['buildings'])
    queryClient.setQueryData(['buildings'], old =>
      old.map(b => (b.id === updatedBuilding.id ? updatedBuilding : b))
    )
    return { previous }
  },
  onError: (err, updatedBuilding, context) => {
    // Rollback si falla
    queryClient.setQueryData(['buildings'], context.previous)
  },
})
```

---

## 🧪 Testing Strategy

```
src/
├── features/
│   └── buildings/
│       ├── components/
│       │   ├── BuildingForm.tsx
│       │   └── BuildingForm.test.tsx      # Tests de componentes
│       ├── hooks/
│       │   ├── useBuildings.ts
│       │   └── useBuildings.test.ts       # Tests de hooks
│       └── services/
│           ├── buildings.service.ts
│           └── buildings.service.test.ts  # Tests de servicios
```

---

## 📚 Referencias

- [React Documentation](https://react.dev)
- [TanStack Query](https://tanstack.com/query)
- [Mantine UI](https://mantine.dev)
- [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)

---

## 🤝 Contribución

Este proyecto sigue:

- ✅ Feature-First Architecture
- ✅ TypeScript Strict Mode
- ✅ ESLint + Prettier
- ✅ Conventional Commits

Para agregar una nueva feature:

1. Crear carpeta en `features/[feature-name]`
2. Agregar estructura completa (components, hooks, services, types, pages)
3. Registrar rutas en `app/router/routes.tsx`
4. Actualizar este README si es necesario
