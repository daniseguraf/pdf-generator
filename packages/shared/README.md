# @my-buildings/shared

**Shared TypeScript types and interfaces for the My Buildings monorepo**

This package contains shared TypeScript types, interfaces, and DTOs that are used across in the frontend package, ensuring type safety and consistency throughout the application.

## 🎯 Purpose

The `@my-buildings/shared` package serves as a centralized location for:

- **API Type Definitions**: Auto-generated TypeScript types from OpenAPI specifications
- **Database Types**: Auto-generated TypeScript interfaces from Prisma schema
- **Shared Enums**: Common enumeration types used across the application
- **DTOs**: Data Transfer Objects for API requests and responses

This approach ensures:

- ✅ **Type Safety**: Compile-time type checking across frontend and backend
- ✅ **Single Source of Truth**: Types are generated from schemas, not manually maintained
- ✅ **Consistency**: Same types used in both client and server code
- ✅ **Developer Experience**: Autocomplete and IntelliSense support

---

## 📁 Structure

```
packages/shared/
├── src/
│   ├── index.ts                 # Main entry point, exports all types
│   └── types/
│       ├── dto.types.ts         # OpenAPI-generated API types
│       └── prisma.types.ts      # Prisma-generated database types
├── package.json
└── README.md
```

---

## 📚 Contents

### 1. API Types (`dto.types.ts`)

Auto-generated from the backend's OpenAPI specification using `openapi-typescript`. Contains:

- **API Paths**: Type-safe route definitions
- **Request/Response Types**: DTOs for all API endpoints
- **Operation Types**: Type definitions for each API operation
- **Component Schemas**: Reusable schema definitions

**Key Types:**

- `CreateBuildingDto` - Building creation payload
- `UpdateBuildingDto` - Building update payload
- `RegisterUserDto` - User registration payload
- `LoginUserDto` - User login payload
- `AuthResponse` - Authentication response with JWT token
- `CreateCommonAreaDto` - Common area creation payload
- `UpdateCommonAreaDto` - Common area update payload
- `CreateReservationDto` - Reservation creation payload

**API Endpoints Covered:**

- `/api/v1/buildings` - Building management
- `/api/v1/auth/*` - Authentication & authorization
- `/api/v1/common-areas` - Common area management
- `/api/v1/reservations` - Reservation management
- `/api/v1/seed` - Database seeding

### 2. Database Types (`prisma.types.ts`)

Auto-generated from the Prisma schema using `prisma-generator-typescript-interfaces`. Contains:

**Enums:**

- `ReservationStatus` - Reservation states (IN_REVIEW, CONFIRMED, CANCELLED, FINISHED)
- `PropertyType` - Building property types (RESIDENTIAL, COMMERCIAL, MIXED)
- `UserRole` - User roles (ADMIN, MANAGER, RESIDENT)
- `Amenities` - Building amenities (PARKING, SECURITY_24_7, ELEVATOR, etc.)
- `CommonAreas` - Common area types (GYM, POOL, GRILL_AREA, etc.)
- `DaysOfWeek` - Days of the week (MONDAY, TUESDAY, etc.)

**Entity Types:**

- `Building` - Building entity with all properties and relations
- `User` - User entity with authentication and role information
- `CommonArea` - Common area entity with scheduling details
- `Reservation` - Reservation entity with status and time information

**Enum Value Objects:**

Each enum has a corresponding `Values` object for runtime usage:

- `ReservationStatusValues`
- `PropertyTypeValues`
- `UserRoleValues`
- `AmenitiesValues`
- `CommonAreasValues`
- `DaysOfWeekValues`

---

## 🚀 Usage

### In Frontend (React)

```typescript
import type { components } from '@my-buildings/shared/index'

export type CreateBuildingDto = components['schemas']['CreateBuildingDto']
export type UpdateBuildingDto = components['schemas']['UpdateBuildingDto']
```

---

## 🔄 Type Generation

The types in this package are **auto-generated** and should not be manually edited.

### Generating API Types

```bash
# From the frontend package
cd packages/frontend
pnpm run types:generate:local
```

---

## 📝 Best Practices

### ✅ Do's

- **Import types from this package** in frontend
- **Regenerate types** after changing API endpoints or database schema
- **Use enum value objects** for runtime checks (e.g., `UserRoleValues.ADMIN`)
- **Leverage TypeScript's type system** for compile-time safety

### ❌ Don'ts

- **Don't manually edit** generated type files
- **Don't forget to regenerate types** after schema changes
- **Don't use string literals** when enum types are available

---

## 🔄 Workflow

1. **Update Backend Schema**
   - Modify Prisma schema or NestJS DTOs
   - Run in packages/backend `pnpm migrate` and `pnpm  generate`

2. **Types Auto-Update**
   - Changes are reflected in `packages/shared`

3. **Update Frontend**
   - Fix any type errors in frontend code
   - Enjoy autocomplete with new types
