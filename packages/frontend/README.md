# 🎨 My Buildings - Frontend

A modern, high-performance React application built with React 19, TypeScript, and Mantine UI. This frontend provides a beautiful and intuitive interface for the My Buildings management system.

## 🚀 Tech Stack

- **[React 19](https://react.dev/)** - Latest React with React Compiler for automatic optimization
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Vite](https://vite.dev/)** - Lightning-fast build tool and dev server
- **[Mantine UI](https://mantine.dev/)** - Comprehensive React component library
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization and caching
- **[React Router 7](https://reactrouter.com/)** - Modern routing solution
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[React Big Calendar](https://jquense.github.io/react-big-calendar/)** - Calendar component for reservations
- **[Phosphor Icons](https://phosphoricons.com/)** - Beautiful icon library
- **[Day.js](https://day.js.org/)** - Lightweight date manipulation library

## ✨ Features

### Core Functionality

- **🔐 Authentication**
  - JWT-based authentication with secure token storage
  - Login/Logout functionality
  - Protected routes with role-based access control
  - Automatic token refresh and session management

- **🏢 Building Management** (Admin/Manager)
  - List all buildings
  - Create new buildings with detailed information
  - Edit building details and amenities
  - Soft delete and restore buildings
  - View building details with common areas

- **🏛️ Common Areas Management** (Manager)
  - Create and manage common areas per building
  - Configure capacity and operating hours
  - Set maximum reservation duration
  - Enable/disable common areas

- **📅 Reservation System** (Resident)
  - Interactive calendar view for reservations
  - Book common areas with date/time selection
  - Automatic validation of operating hours
  - Overlap prevention
  - View and cancel personal reservations

### UI/UX Features

- **🎨 Modern Design**
  - Clean and intuitive interface
  - Responsive layout for all screen sizes
  - Dark/Light theme toggle
  - Smooth animations and transitions
  - Loading states and skeletons
  - Empty states with helpful messages

- **⚡ Performance**
  - React 19 Compiler for automatic optimization
  - Efficient data caching and invalidation
  - Minimal bundle size

## 📁 Project Structure

```
src/
├── app/                          # Application configuration
│   ├── layouts/                  # Layout components
│   │   ├── AppLayout.tsx        # Main app layout with header/nav
│   │   ├── AuthLayout.tsx       # Authentication layout
│   │   └── PublicLayout.tsx     # Public pages layout
│   └── routes/
│       └── AppRoutes.tsx        # Route definitions
│
├── features/                     # Feature-based modules
│   ├── auth/                    # Authentication feature
│   │   ├── components/          # ProtectedRoute component
│   │   ├── context/             # Auth context and provider
│   │   ├── hooks/               # useAuth, useRole, useLogin
│   │   ├── pages/               # Login and Register pages
│   │   ├── services/            # Auth API service
│   │   └── types/               # Auth type definitions
│   │
│   ├── buildings/               # Buildings & Common Areas
│   │   ├── components/          # Building forms, lists, details
│   │   ├── helpers/             # Utility functions
│   │   ├── hooks/               # Data fetching and mutations
│   │   ├── pages/               # Buildings list and detail pages
│   │   ├── services/            # Buildings API service
│   │   └── types/               # Building type definitions
│   │
│   └── reservations/            # Reservation system
│       ├── components/          # Calendar, forms, lists
│       ├── helpers/             # Date and validation helpers
│       ├── hooks/               # Reservation queries and mutations
│       ├── pages/               # Reservations page
│       ├── services/            # Reservations API service
│       └── types/               # Reservation type definitions
│
├── components/                   # Shared UI components
│   ├── BuildingCardInfo/        # Building card component
│   ├── CommonAreaCard/          # Common area card
│   ├── ScheduleRange/           # Schedule display component
│   ├── layout/                  # Header, Navbar
│   ├── NoElementsAvailable.tsx  # Empty state component
│   └── ThemeToggle.tsx          # Dark/Light mode toggle
│
├── hooks/                        # Global custom hooks
│   └── useColorScheme.ts        # Theme management hook
│
├── lib/                          # Library configurations
│   ├── axios.ts                 # Axios instance with interceptors
│   └── queryClient.ts           # TanStack Query configuration
│
├── utils/                        # Utility functions
│   ├── amenities.dictionary.ts  # Amenities translations
│   ├── dates/                   # Date formatting utilities
│   └── getCommonAreaColor.ts    # Color mapping for areas
│
├── App.tsx                       # Root component
├── main.tsx                      # Application entry point
├── main.css                      # Global styles
└── theme.ts                      # Mantine theme configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18.x
- pnpm >= 10.23
- Backend API running (see `packages/backend/README.md`)

### Installation

1. **Install dependencies** (from root directory)

```bash
pnpm install
```

2. **Set up environment variables**

Create a `.env` file in the `packages/frontend` directory:

```env
VITE_API_URL=http://localhost:3000
```

For production:

```env
VITE_API_URL=https://your-api-domain.com
```

### Development

Run the development server:

```bash
# From root directory
pnpm dev:frontend

# Or from packages/frontend
pnpm dev
```

The application will be available at [http://localhost:5173](http://localhost:5173)

### Build

Build for production:

```bash
# From root directory
pnpm build:frontend

# Or from packages/frontend
pnpm build
```

Preview production build:

```bash
pnpm preview
```

## 🔧 Configuration

### Path Aliases

The project uses path aliases for cleaner imports:

```typescript
import { Component } from '@app/...' // App configuration
import { Feature } from '@features/...' // Feature modules
import { Component } from '@components/...' // Shared components
import { useHook } from '@hooks/...' // Custom hooks
import { api } from '@lib/...' // Library configs
import { util } from '@utils/...' // Utilities
import { Type } from '@types/...' // Type definitions
import { asset } from '@assets/...' // Static assets
```

### Environment Variables

| Variable       | Description          | Default                 |
| -------------- | -------------------- | ----------------------- |
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000` |

## 📝 Scripts

| Command                     | Description                                |
| --------------------------- | ------------------------------------------ |
| `pnpm dev`                  | Start development server                   |
| `pnpm build`                | Build for production                       |
| `pnpm preview`              | Preview production build                   |
| `pnpm lint`                 | Run ESLint                                 |
| `pnpm types:generate`       | Generate TypeScript types from running API |
| `pnpm types:generate:local` | Generate types from local OpenAPI spec     |

## 🔐 Authentication Flow

1. User enters credentials on login page
2. Frontend sends POST request to `/api/v1/auth/login`
3. Backend validates and returns JWT token
4. Token is stored in localStorage
5. Axios interceptor adds token to all requests
6. Protected routes check authentication status
7. Role-based access control restricts certain pages

## 🎯 Key Features Implementation

### Data Fetching with TanStack Query

```typescript
// Query example
const { data, isLoading, error } = useBuildings()

// Mutation example
const { mutate } = useCreateBuilding()
mutate(buildingData, {
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries(['buildings'])
  },
})
```

### Form Validation with Zod

```typescript
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
})

const form = useForm({
  validate: zodResolver(schema),
})
```

### Protected Routes

```typescript
<ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']}>
  <BuildingsListPage />
</ProtectedRoute>
```

## 🎨 UI Components

### Mantine Components Used

- **Layout**: AppShell, Container, Stack, Group, Grid
- **Forms**: TextInput, NumberInput, Select, MultiSelect, DateTimePicker
- **Data Display**: Table, Card, Badge, Avatar, Text
- **Feedback**: Notifications, Modal, Loader, Skeleton
- **Navigation**: Tabs, Menu, Breadcrumbs
- **Buttons**: Button, ActionIcon

### Custom Components

- `BuildingCardInfo` - Display building information
- `CommonAreaCard` - Show common area details
- `ScheduleRange` - Display operating hours
- `NoElementsAvailable` - Empty state placeholder
- `ThemeToggle` - Dark/Light mode switcher

## 🧪 Testing

Testing infrastructure is ready for implementation:

- **Unit Tests**: Vitest (planned)
- **E2E Tests**: Playwright (planned)
- **Component Tests**: React Testing Library (planned)

## 📦 Type Generation

The frontend uses automatically generated types from the backend OpenAPI specification:

```bash
# Generate types from running backend
pnpm types:generate

# Generate types from local OpenAPI file
pnpm types:generate:local
```

Generated types are stored in `packages/shared/src/types/dto.types.ts` and shared between frontend and backend.

## 🚀 Deployment

The frontend is deployed on **Vercel** with automatic deployments from the main branch.

### Vercel Configuration

See `vercel.json` for deployment settings:

- Build command: `pnpm build`
- Output directory: `dist`
- Environment variables configured in Vercel dashboard

### Build Optimization

- Tree shaking for minimal bundle size
- Code splitting by route
- Asset optimization (images, fonts)
- CSS minification
- Gzip compression

## 🐛 Debugging

### React Query Devtools

The app includes React Query Devtools for debugging data fetching:

- Press the floating icon in the bottom-left corner
- Inspect queries, mutations, and cache
- View query states and timings

### Browser DevTools

- Redux DevTools compatible with React Query
- Network tab for API requests
- Console for error messages
- React DevTools for component inspection

## 🔄 State Management

### Global State

- **Auth Context**: User authentication and role information
- **TanStack Query**: Server state caching and synchronization
- **Local Storage**: Token persistence

### Local State

- React hooks (useState, useReducer)
- Mantine form state
- URL state with React Router

## 🔗 Related Documentation

- [Backend README](../backend/README.md)
- [Project Root README](../../README.md)
- [Roadmap](../../ROADMAP.md)
