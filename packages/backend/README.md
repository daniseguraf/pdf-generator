# 🏗️ My Buildings - Backend API

RESTful API built with NestJS for the My Buildings management system.

## 📋 Table of Contents

- [Description](#-description)
- [Technologies](#-technologies)
- [Architecture](#-architecture)
- [Configuration](#-configuration)
- [Available Scripts](#-available-scripts)
- [Database](#-database)
- [Modules](#-modules)
- [Authentication](#-authentication)
- [API Documentation](#-api-documentation)
- [Development](#-development)

---

## 🎯 Description

This backend provides a complete API for managing buildings, common areas, reservations, and users. It implements JWT authentication, role-based authorization, complex business validations, and PDF report generation.

**Key Features:**

- 🔐 JWT authentication with Passport strategies
- 🛡️ Role-based authorization (Admin, Manager, Resident)
- 📊 Prisma ORM with PostgreSQL
- 📝 DTO validation with class-validator
- 📄 PDF generation with pdfmake
- 🔄 Soft deletes for data integrity
- 📚 Automatic documentation with Swagger/OpenAPI
- 🌱 Seeders for test data

---

## 🛠️ Technologies

| Technology          | Version | Purpose             |
| ------------------- | ------- | ------------------- |
| **NestJS**          | 11.0+   | Main framework      |
| **Prisma**          | 7.0+    | ORM and migrations  |
| **PostgreSQL**      | 14+     | Database            |
| **Passport JWT**    | 11.0+   | Authentication      |
| **class-validator** | 0.14+   | DTO validation      |
| **pdfmake**         | 0.2+    | PDF generation      |
| **Swagger**         | 11.2+   | API documentation   |
| **bcrypt**          | 6.0+    | Password hashing    |

---

## 🏛️ Architecture

### Module Structure

```
src/
├── auth/                    # Authentication and authorization
│   ├── decorators/         # @Auth(), @Roles(), custom decorators
│   ├── dto/                # Login and register DTOs
│   ├── guards/             # Role guards
│   ├── strategies/         # JWT Strategy
│   └── types/              # JWT payload types
│
├── buildings/              # Buildings CRUD
│   ├── dto/                # Create and update DTOs
│   ├── entities/           # Response entities
│   └── buildings.service.ts
│
├── common-areas/           # Common areas management
│   ├── dto/
│   ├── entities/
│   └── common-areas.service.ts
│
├── reservations/           # Reservation system
│   ├── dto/
│   ├── entities/
│   └── reservations.service.ts
│
├── seed/                   # Database seeders
│   ├── data/               # Test data
│   └── seed.service.ts
│
├── printer/                # PDF generation service
│   └── printer.service.ts
│
├── prisma/                 # Prisma service
│   └── prisma.service.ts
│
├── config/                 # Environment configuration and validation
│   ├── env.config.ts
│   └── env.validation.ts
│
└── common/                 # Shared decorators and utilities
    └── decorators/
```

### Architecture Pattern

The backend follows a **NestJS modular architecture** with the following principles:

- **Independent modules**: Each feature has its own module with controllers, services, and DTOs
- **Dependency injection**: Extensive use of DI for testability and maintainability
- **Separation of concerns**: Controllers (routing) → Services (business logic) → Prisma (data access)
- **Validated DTOs**: All inputs are validated with class-validator
- **Guards and decorators**: Route protection with custom guards
- **Exception filters**: Centralized error handling

---

## ⚙️ Configuration

### Environment Variables

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

# JWT (optional, has default values)
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

### Prerequisites

- Node.js >= 18.x
- pnpm >= 10.23
- PostgreSQL 14+ (or Docker)

### Installation

From the monorepo root directory:

```bash
# Install dependencies
pnpm install

# Start database with Docker
docker-compose up -d

# Generate Prisma client
cd packages/backend
pnpm generate

# Run migrations
pnpm migrate
```

---

## 📜 Available Scripts

| Script         | Command              | Description                            |
| -------------- | -------------------- | -------------------------------------- |
| **Development** | `pnpm dev`           | Start server in watch mode             |
| **Build**      | `pnpm build`         | Build project for production           |
| **Production** | `pnpm start:prod`    | Run migrations and start server        |
| **Lint**       | `pnpm lint`          | Run ESLint with auto-fix               |
| **Format**     | `pnpm format`        | Format code with Prettier              |
| **Tests**      | `pnpm test`          | Run unit tests                         |
| **E2E Tests**  | `pnpm test:e2e`      | Run end-to-end tests                   |
| **Coverage**   | `pnpm test:cov`      | Generate coverage report               |
| **Generate**   | `pnpm generate`      | Generate Prisma client and types       |
| **Migrate**    | `pnpm migrate`       | Run migrations in development          |
| **Deploy**     | `pnpm prisma:deploy` | Run migrations in production           |

---

## 🗄️ Database

### Prisma ORM

The project uses **Prisma** as ORM with the following features:

- **Declarative schema**: Model definitions in `prisma/schema.prisma`
- **Migrations**: Database version control
- **Type safety**: Automatically generated TypeScript types
- **Relations**: Full support for complex relationships
- **Soft deletes**: Implemented with `deletedAt` field

### Main Schema

```prisma
model User {
  id          String    @id @default(uuid())
  email       String    @unique
  password    String
  fullName    String
  role        UserRole
  buildingId  String?
  building    Building? @relation("BuildingResidents")
  // ... more fields
}

model Building {
  id          String       @id @default(uuid())
  name        String
  address     String
  floors      Int
  propertyType PropertyType
  managerId   String?
  manager     User?        @relation("BuildingManager")
  residents   User[]       @relation("BuildingResidents")
  commonAreas CommonArea[]
  deletedAt   DateTime?
  // ... more fields
}

model CommonArea {
  id              String        @id @default(uuid())
  name            String
  type            CommonAreas
  capacity        Int
  buildingId      String
  building        Building      @relation(...)
  reservations    Reservation[]
  operatingHours  Json
  // ... more fields
}

model Reservation {
  id            String            @id @default(uuid())
  userId        String
  user          User              @relation(...)
  commonAreaId  String
  commonArea    CommonArea        @relation(...)
  startTime     DateTime
  endTime       DateTime
  status        ReservationStatus
  // ... more fields
}
```

### Migrations

```bash
# Create a new migration
pnpm migrate

# Apply migrations in production
pnpm prisma:deploy

# Reset database (development)
npx prisma migrate reset

# Check migration status
npx prisma migrate status
```

### Seeders

The system includes seeders to populate the database with test data:

```bash
# Run seeder (development only)
curl http://localhost:3000/api/v1/seed
```

**Generated data:**

- 3 users (Admin, Manager, Resident)
- 2 buildings with common areas
- Realistic test data

---

## 📦 Modules

### Auth Module

**Responsibility**: Authentication and authorization

**Main endpoints:**

- `POST /auth/register` - User registration
- `POST /auth/login` - Login with JWT
- `GET /auth/me` - Authenticated user profile
- `GET /auth/check-auth-status` - Verify authentication status

**Key components:**

- `JwtStrategy`: Passport strategy to validate tokens
- `UserRoleGuard`: Guard to verify roles
- `@Auth()`: Custom decorator that combines authentication and roles
- `@GetUser()`: Decorator to get user from request

### Buildings Module

**Responsibility**: Buildings CRUD

**Features:**

- Filtering by property type and manager
- Soft deletes with restore capability
- Role-based permission validations
- Relationships with managers and residents

### Common Areas Module

**Responsibility**: Common areas management

**Features:**

- Association with buildings
- Operating hours configuration
- Capacity control
- Availability validation

### Reservations Module

**Responsibility**: Reservation system

**Features:**

- Operating hours validation
- Reservation overlap prevention
- Maximum duration limit
- Reservation statuses (Confirmed, Cancelled, In Review, Finished)
- Filtering by user's building

### Printer Module

**Responsibility**: PDF report generation

**Features:**

- Building report generation
- Reservation report generation
- Custom fonts usage (Roboto)
- Professional format with tables and styles

### Seed Module

**Responsibility**: Test data population

**Usage**: Only available in development environment

---

## 🔐 Authentication

### JWT Strategy

The system uses **JWT (JSON Web Tokens)** for authentication:

```typescript
// JWT Payload
interface JwtPayload {
  id: string
  email: string
  role: UserRole
}
```

### Route Protection

Use the `@Auth()` decorator to protect endpoints:

```typescript
// Authenticated users only
@Auth()
@Get('profile')
getProfile(@GetUser() user: User) {
  return user;
}

// Admins only
@Auth(UserRole.ADMIN)
@Delete(':id')
deleteBuilding(@Param('id') id: string) {
  // ...
}

// Admins or Managers
@Auth(UserRole.ADMIN, UserRole.MANAGER)
@Post()
createBuilding(@Body() dto: CreateBuildingDto) {
  // ...
}
```

### Custom Guards

- `JwtAuthGuard`: Verifies valid JWT token
- `UserRoleGuard`: Verifies allowed roles

---

## 📚 API Documentation

### Swagger UI

Once the server is running, access the interactive documentation:

**URL**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

### OpenAPI Spec

The OpenAPI file is automatically generated and used for:

- Interactive Swagger documentation
- TypeScript type generation for frontend
- API testing
- Integration with development tools

### Documentation Decorators

```typescript
@ApiTags('buildings')
@ApiOperation({ summary: 'Get all buildings' })
@ApiResponse({ status: 200, description: 'List of buildings', type: [Building] })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@Get()
findAll() {
  // ...
}
```
