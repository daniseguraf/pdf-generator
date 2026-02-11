# 🏢 My Buildings - Building Management System

<div align="center">

**A modern, fullstack building management platform built with cutting-edge technologies**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11.0+-red?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-19.2+-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-7.0+-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10.23+-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Roadmap](#-roadmap)

</div>

## 👤 Author

**Daniel Segura**

- GitHub: [@daniseguraf](https://github.com/daniseguraf)
- LinkedIn: [linkedin.com/in/daniel-segura-fang](https://linkedin.com/in/daniel-segura-fang)

---

## 🎯 Overview

My Buildings is a fullstack building management application designed to simplify property administration.
It includes authentication, authorization, and a modern UI, showcasing end-to-end feature delivery and real-world business logic.

### Highlights

- **Fullstack TypeScript** – React + Node.js with shared types
- **Authentication & RBAC** – JWT with role-based access
- **Scalable Architecture** – Monorepo structure and clean separation of concerns
- **Modern UI – Responsive** interface built with Mantine
- **Production Ready** – Deployed on Vercel (frontend) and Railway (backend)
- **Dockerized DB** – Easy local setup and deployment

---

## ✨ Core Features

- **🔐 Authentication & Authorization**
  - JWT authentication and secure session handling
  - Role-based access (Admin, Manager, Resident)
  - Protected routes and API endpoints
  - Login / Logout flows

- **🏢 Building Management**
  - Full CRUD operations for buildings
  - Property type classification (Residential, Commercial, Mixed)
  - Detailed infor (floors, address, contact data)
  - Role-based permissions for building operations

- **🏛️ Common Areas**
  - CRUD operations for common areas
  - Capacity management and active/inactive status
  - Association with specific buildings
  - Operating hours configuration

- **📅 Reservation System**
  - Date and time booking
  - Automatic operating-hours validation
  - Overlap prevention system
  - Maximum duration enforcement
  - Reservation statuses (Confirmed, Cancelled, On Review, Finished)
  - View and manage personal reservations

### Next Improvements

- 🎫 Maintenance ticket system
- 📊 Analytics dashboard
- 📧 Email notifications
- 📄 PDF report generation for buildings and reservations
- 🧪 Testing coverage

---

## 📸 Screenshots

### Login Page

_Secure authentication with JWT tokens_

![Login Page](docs/screenshots/login.png)

### Buildings List

_Manage all your buildings in one place_

![Buildings List](docs/screenshots/buildings-list.png)

### Building Detail View

_Detailed common areas list_

![Building Details](docs/screenshots/building-detail-common-areas.png)

_Amenities_

![Building Details](docs/screenshots/building-detail-amenities.png)

_Building general information_

![Building Details](docs/screenshots/building-detail-general-information.png)

_Create new building form_

![Building Details](docs/screenshots/create-building.png)

### Create new common area form

![Building Details](docs/screenshots/add-common-area.png)

### Reservations Page

![Reservations](docs/screenshots/reservations.png)

_Reservations Calendar_

![Reservations](docs/screenshots/reservations-calendar.png)

_My reservations lists_

![Reservations](docs/screenshots/my-reservations.png)

_Create reservation form_

![Reservations](docs/screenshots/create-reservation.png)

### Dark Theme

_Buildings page_

![Buildings List Dark Theme](docs/screenshots/buildings-list-dark-theme.png)

_Building detail page dark theme_

![Building Details](docs/screenshots/buildings-list-dark-theme.png)

---

## 🛠️ Tech Stack

### Backend

- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework for scalable server-side applications
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM for type-safe database access
- **[PostgreSQL](https://www.postgresql.org/)** - Advanced open-source relational database
- **[pdfmake](https://pdfmake.github.io/docs/)** - Client/server-side PDF printing
- **[Swagger/OpenAPI](https://swagger.io/)** - API documentation and type generation
- **[class-validator](https://github.com/typestack/class-validator)** - Decorator-based validation

### Frontend

- **[React 19](https://react.dev/)** - Latest React with React Compiler for automatic optimization
- **[Mantine UI](https://mantine.dev/)** - Comprehensive React component library
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization and caching
- **[React Router 7](https://reactrouter.com/)** - Modern routing solution
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client
- **[Vite](https://vite.dev/)** - Next-generation frontend tooling

### DevOps & Tools

- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Docker](https://www.docker.com/)** - Containerization platform
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking
- **[ESLint](https://eslint.org/)** - Code quality and consistency
- **[Prettier](https://prettier.io/)** - Code formatting

---

## 🏗️ Architecture

### Monorepo Structure

```
my-buildings/
├── packages/
│   ├── backend/                # NestJS API server
│   │   ├── src/
│   │   │   ├── auth/         # Authentication module (JWT, Guards, Strategies)
│   │   │   ├── buildings/    # Buildings CRUD module
│   │   │   ├── common-areas/ # Common areas module
│   │   │   ├── reservations/ # Reservations system
│   │   │   ├── seed/         # Database seeding
│   │   │   ├── printer/      # PDF generation service
│   │   │   ├── prisma/       # Database service
│   │   │   ├── config/       # Environment configuration
│   │   │   ├── common/       # Shared decorators & validators
│   │   │   └── main.ts       # Application entry point
│   │   ├── prisma/
│   │   │   ├── schema.prisma # Database schema
│   │   │   └── migrations/   # Database migrations
│   │   ├── fonts/            # Fonts for PDF generation
│   │   └── test/             # E2E tests
│   │
│   ├── frontend/             # React application
│   │   ├── src/
│   │   │   ├── app/          # App configuration & routes
│   │   │   │   ├── layouts/  # Layout components
│   │   │   │   └── routes/   # Route definitions
│   │   │   ├── features/     # Feature-based modules
│   │   │   │   ├── auth/     # Authentication (Login, Context)
│   │   │   │   ├── buildings/    # Buildings & Common Areas
│   │   │   │   └── reservations/ # Reservation system
│   │   │   ├── components/   # Shared UI components
│   │   │   ├── hooks/        # Custom React hooks
│   │   │   ├── lib/          # Axios & QueryClient configs
│   │   │   ├── utils/        # Helper functions
│   │   │   └── theme.ts      # Mantine theme configuration
│   │   └── public/           # Static assets
│   │
│   └── shared/               # Shared types between FE & BE
│       └── src/
│           └── types/        # Generated TypeScript types
│
├── docs/
│   └── screenshots/          # Application screenshots
├── docker-compose.yaml       # Docker services configuration
└── pnpm-workspace.yaml       # Monorepo workspace config
```

### Design Patterns & Best Practices

- **Module-based architecture** in NestJS for separation of concerns
- **Feature-based structure** in React for scalability
- **Type generation** from OpenAPI specs for type safety across FE/BE
- **Repository pattern** with Prisma for data access
- **DTO validation** with class-validator decorators
- **Error handling** with global exception filters
- **API versioning** for backward compatibility
- **Soft deletes** for data integrity

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **pnpm** >= 10.23
- **Docker** & **Docker Compose** (for database)
- **PostgreSQL** 14+ (or use Docker)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/daniseguraf/my-buildings.git
cd my-buildings
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Create a `.env` file in the `packages/backend` directory:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/my_buildings?schema=public"
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=my_buildings

# Server
PORT=3000
NODE_ENV=development
```

4. **Start the database**

```bash
docker-compose up -d
```

5. **Run database migrations**

```bash
cd packages/backend
pnpm migrate
```

6. **Generate Prisma client and types**

```bash
cd packages/backend
pnpm generate
```

### Running the Application

#### Development Mode

Run both frontend and backend concurrently:

```bash
# From root directory
pnpm dev
```

Or run them separately:

```bash
# Backend only (http://localhost:3000)
pnpm dev:backend

# Frontend only (http://localhost:5173)
pnpm dev:frontend
```

#### Production Build

```bash
# Build all packages
pnpm build

# Build individually
pnpm build:backend
pnpm build:frontend

# Start production server
cd packages/backend
pnpm start:prod
```

---

## 📡 API Documentation

Once the backend is running, access the interactive API documentation:

- **Swagger UI**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- **OpenAPI JSON**: Generated automatically in development mode

### Key Endpoints

**Authentication** (`/api/v1/auth`)

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token
- `GET /auth/me` - Get current user profile
- `GET /auth/check-auth-status` - Verify authentication status

**Buildings** (`/api/v1/buildings`)

- `GET /buildings` - List all buildings (with filters)
- `POST /buildings` - Create a new building (Admin/Manager)
- `GET /buildings/:id` - Get building details
- `PATCH /buildings/:id` - Update building (Admin/Manager)
- `DELETE /buildings/:id` - Soft delete building (Admin)
- `PATCH /buildings/:id/restore` - Restore deleted building (Admin)

**Common Areas** (`/api/v1/common-areas`)

- `GET /common-areas/building/:buildingId` - List areas by building
- `POST /common-areas` - Create common area (Manager)
- `GET /common-areas/:id` - Get area details
- `PATCH /common-areas/:id` - Update common area (Manager)
- `DELETE /common-areas/:id` - Delete common area (Manager)

**Reservations** (`/api/v1/reservations`)

- `POST /reservations` - Create new reservation (Resident)
- `GET /reservations/building` - Get reservations by resident's building
- `DELETE /reservations/:id` - Cancel reservation (Resident/Admin)

**Seed** (`/api/v1/seed`)

- `GET /seed` - Populate database with test data (Development only)

---

## 📈 Database Schema

The application uses **PostgreSQL** with **Prisma ORM**. The schema includes:

### Core Entities

- **User**: Application users with role-based access (Admin, Manager, Resident)
  - Authentication credentials (email, password)
  - Role assignment and building association
  - Relationship with reservations and managed buildings

- **Building**: Core entity for property management
  - Property information (name, address, type, year built)
  - Soft delete support with `deletedAt` field
  - Amenities (parking, security, elevator, etc.)

- **CommonArea**: Shared spaces within buildings
  - Type classification (Gym, Pool, Event Room, etc.)
  - Capacity and availability management
  - Operating hours and days configuration
  - Maximum reservation duration rules

- **Reservation**: Booking system for common areas
  - Time slot management with overlap prevention
  - Status tracking (In Review, Confirmed, Cancelled, Finished)
  - User and common area associations
  - Attendees count and notes

### Key Relationships

```
User (Manager) ──< manages >── Building
User (Resident) ──< lives in >── Building
Building ──< has >── CommonArea
User ──< makes >── Reservation
CommonArea ──< has >── Reservation
```

For detailed schema, see [`packages/backend/prisma/schema.prisma`](packages/backend/prisma/schema.prisma)

---

## 🗺️ Roadmap

See [ROADMAP.md](ROADMAP.md) for detailed development plan.

**Upcoming Features:**

---

## 🎯 What This Project Demonstrates

### Backend Skills

- ✅ NestJS with modular architecture and dependency injection
- ✅ Prisma ORM with complex relationships and migrations
- ✅ Complete JWT authentication (Strategy, Guards, Decorators)
- ✅ Complex business validations (no-overlapping reservations)
- ✅ DTOs with class-validator for request validation
- ✅ RESTful API design with proper HTTP methods
- ✅ Proper error handling with custom exceptions
- ✅ Database seeders for test data
- ✅ Soft deletes for data integrity
- ✅ Role-based authorization at endpoint level

### Frontend Skills

- ✅ React 19 with TypeScript and strict type checking
- ✅ Context API for global state management
- ✅ TanStack Query for data fetching, caching, and mutations
- ✅ Mantine UI for modern component library
- ✅ Complex forms with real-time validation
- ✅ Protected routes with role-based access control
- ✅ Axios interceptors for authentication
- ✅ Feature-based scalable architecture
- ✅ Custom hooks for reusable logic
- ✅ Loading states, error handling, and empty states

### DevOps Skills

- ✅ Monorepo structure with pnpm workspaces
- ✅ Docker Compose for local development
- ✅ Deployment on Railway (backend + PostgreSQL)
- ✅ Deployment on Vercel (frontend)
- ✅ Environment variables per environment
- ✅ Automatic CI/CD with GitHub integration
- ✅ CORS configuration for production
- ✅ Database migrations in production
