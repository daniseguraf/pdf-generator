# Plan MVP - Sistema de Gestión de Edificios (Portfolio Fullstack)

## 🎯 Objetivo

Crear un sistema funcional y desplegado que demuestre habilidades fullstack completas. Cada fase implementa un feature completo (Backend + Frontend) para tener funcionalidad demostrable desde el inicio.

**Tiempo estimado: 9-13 días (2 semanas)**

---

## 🏗️ FASE 1: Autenticación y Login (2-3 días)

> **Objetivo:** Sistema de autenticación completo funcionando end-to-end

### Backend - User Model y Auth

- [ ] Actualizar Prisma Schema
  - [ ] Abrir [`packages/backend/prisma/schema.prisma`](packages/backend/prisma/schema.prisma)
  - [ ] Agregar modelo User:

    ```prisma
    model User {
      id        Int      @id @default(autoincrement())
      email     String   @unique
      password  String
      firstName String   @map("first_name")
      lastName  String   @map("last_name")
      role      UserRole @default(RESIDENT)
      isActive  Boolean  @default(true) @map("is_active")
      createdAt DateTime @default(now()) @map("created_at")
      updatedAt DateTime @updatedAt @map("updated_at")

      @@map("users")
    }
    ```

  - [ ] Ejecutar migración: `cd packages/backend && npx prisma migrate dev --name add_user_model`

- [ ] Instalar dependencias JWT

  ```bash
  cd packages/backend
  pnpm add @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
  pnpm add -D @types/passport-jwt @types/bcrypt
  ```

- [ ] Generar módulo Auth
  - [ ] `nest g module auth`
  - [ ] `nest g service auth --no-spec`
  - [ ] `nest g controller auth --no-spec`

- [ ] Crear DTOs en `src/auth/dto/`
  - [ ] `RegisterDto` - email, password, firstName, lastName
  - [ ] `LoginDto` - email, password
  - [ ] Agregar decoradores de validación

- [ ] Implementar `auth.service.ts`
  - [ ] Inyectar PrismaService y JwtService
  - [ ] `register(dto)` - hashear password (bcrypt, 10 rounds), crear usuario
  - [ ] `login(dto)` - validar credenciales, generar JWT
  - [ ] `validateUser(email, password)` - comparar hash
  - [ ] `generateToken(user)` - payload: { sub: user.id, email, role }

- [ ] Crear `jwt.strategy.ts`
  - [ ] Extender PassportStrategy(Strategy)
  - [ ] Constructor con secretOrKey desde env
  - [ ] Método validate(payload) - retornar user desde DB

- [ ] Crear guards en `src/auth/guards/`
  - [ ] `jwt-auth.guard.ts` - extender AuthGuard('jwt')
  - [ ] `roles.guard.ts` - verificar roles del usuario

- [ ] Crear decorators en `src/auth/decorators/`
  - [ ] `roles.decorator.ts` - `@Roles(...roles: string[])`
  - [ ] `current-user.decorator.ts` - `@CurrentUser()` extrae req.user

- [ ] Implementar `auth.controller.ts`
  - [ ] `POST /auth/register` - público
  - [ ] `POST /auth/login` - público, retorna { user, access_token }
  - [ ] `GET /auth/me` - protegido con @UseGuards(JwtAuthGuard)

- [ ] Configurar AuthModule
  - [ ] Importar JwtModule.register({ secret, signOptions: { expiresIn: '24h' } })
  - [ ] Importar PassportModule
  - [ ] Providers: AuthService, JwtStrategy
  - [ ] Exports: AuthService, JwtStrategy

- [ ] Registrar en `app.module.ts`

- [ ] Configurar CORS en `main.ts`
  - [ ] `app.enableCors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true })`

### Frontend - Auth Module

- [ ] Crear estructura `packages/frontend/src/features/auth/`
  - [ ] `types/auth.types.ts`
  - [ ] `services/auth.service.ts`
  - [ ] `context/AuthContext.tsx`
  - [ ] `components/LoginForm.tsx`
  - [ ] `components/RegisterForm.tsx`
  - [ ] `pages/LoginPage.tsx`
  - [ ] `pages/RegisterPage.tsx`

- [ ] Crear tipos en `types/auth.types.ts`

  ```typescript
  export interface User {
    id: number
    email: string
    firstName: string
    lastName: string
    role: string
  }

  export interface LoginDto {
    email: string
    password: string
  }

  export interface RegisterDto {
    email: string
    password: string
    firstName: string
    lastName: string
  }

  export interface AuthResponse {
    user: User
    access_token: string
  }
  ```

- [ ] Crear servicio `services/auth.service.ts`
  - [ ] `login(dto: LoginDto)` - POST /auth/login
  - [ ] `register(dto: RegisterDto)` - POST /auth/register
  - [ ] `getMe()` - GET /auth/me
  - [ ] `logout()` - helper para limpiar estado

- [ ] Configurar Axios en [`lib/axios.ts`](packages/frontend/src/lib/axios.ts)
  - [ ] Request interceptor: agregar Authorization header
    ```typescript
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    ```
  - [ ] Response interceptor: capturar 401
    ```typescript
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    ```

- [ ] Crear AuthContext en `context/AuthContext.tsx`
  - [ ] Estado: user, token, isAuthenticated, isLoading
  - [ ] Actions: login, logout, checkAuth
  - [ ] Guardar token en localStorage
  - [ ] useEffect para restaurar sesión al montar

- [ ] Crear `components/LoginForm.tsx`
  - [ ] useForm de Mantine
  - [ ] Campos: email (validación email), password (min 6)
  - [ ] useMutation para login
  - [ ] Mostrar errores con notificaciones
  - [ ] Al éxito: guardar token, navegar a /

- [ ] Crear `components/RegisterForm.tsx`
  - [ ] Campos: email, password, confirmPassword, firstName, lastName
  - [ ] Validación: passwords match
  - [ ] useMutation para register
  - [ ] Al éxito: auto-login o navegar a /login

- [ ] Crear `pages/LoginPage.tsx`
  - [ ] Layout centrado con Paper de Mantine
  - [ ] LoginForm
  - [ ] Link a /register

- [ ] Crear `pages/RegisterPage.tsx`
  - [ ] Layout similar
  - [ ] RegisterForm
  - [ ] Link a /login

- [ ] Crear `components/ProtectedRoute.tsx`

  ```typescript
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
  ```

- [ ] Actualizar rutas en `src/app/routes/`
  - [ ] Rutas públicas: /login, /register
  - [ ] Rutas protegidas: wrap con ProtectedRoute

- [ ] Agregar User Menu en header
  - [ ] Menu de Mantine con avatar
  - [ ] Mostrar nombre del usuario
  - [ ] Item: Logout (onClick → logout del context)

- [ ] Envolver app con AuthProvider en `main.tsx` o `App.tsx`

### Testing Fase 1

- [ ] Backend: Probar con Postman/Insomnia
  - [ ] POST /auth/register → crea usuario
  - [ ] POST /auth/login → retorna token
  - [ ] GET /auth/me → retorna usuario (con token)

- [ ] Frontend: Probar flujo completo
  - [ ] Abrir /login
  - [ ] Login con credenciales
  - [ ] Verificar redirect a home
  - [ ] Verificar token en localStorage
  - [ ] Logout y verificar redirect

---

## 🏢 FASE 2: Buildings CRUD Completo (2-3 días)

> **Objetivo:** Gestión completa de edificios end-to-end con autenticación

### Backend - Buildings Module

- [ ] Mejorar [`buildings.service.ts`](packages/backend/src/buildings/buildings.service.ts)
  - [ ] Método `create()`
    - [ ] Envolver en try-catch
    - [ ] Validar que managerId existe: `await this.prisma.employee.findUnique()`
    - [ ] Si no existe: `throw new BadRequestException('Manager not found')`
    - [ ] Capturar errores de Prisma (unique constraints)
  - [ ] Método `update()`
    - [ ] Agregar try-catch
    - [ ] Verificar que building existe primero
    - [ ] Si no existe: `throw new NotFoundException()`
  - [ ] Método `remove()`
    - [ ] Verificar que existe antes de soft delete
    - [ ] Manejar errores apropiadamente

- [ ] Proteger `buildings.controller.ts`
  - [ ] Agregar `@UseGuards(JwtAuthGuard, RolesGuard)` a nivel de controller
  - [ ] `@Roles('ADMIN', 'MANAGER')` en create, update, delete
  - [ ] GET endpoints pueden ser accesibles por cualquier autenticado

- [ ] Crear seeder inicial `prisma/seed.ts`
  - [ ] Crear 1 usuario admin (email: admin@demo.com, pass: password123)
  - [ ] Crear 1 empleado manager
  - [ ] Crear 2 edificios
  - [ ] Configurar en package.json: `"prisma": { "seed": "ts-node prisma/seed.ts" }`
  - [ ] Ejecutar: `npx prisma db seed`

### Frontend - Buildings Module

- [ ] Verificar estructura existente en `features/buildings/`

- [ ] Actualizar hooks de mutaciones
  - [ ] `hooks/mutations/useCreateBuilding.ts`
    - [ ] Agregar `onSuccess`: `notifications.show({ title: 'Éxito', message: 'Edificio creado' })`
    - [ ] Agregar `onError`: `notifications.show({ title: 'Error', message: error.message, color: 'red' })`
  - [ ] `hooks/mutations/useUpdateBuilding.ts`
    - [ ] Agregar notificaciones similares
  - [ ] `hooks/mutations/useDeleteBuilding.ts`
    - [ ] Agregar confirmación con `modals.openConfirmModal()`
    - [ ] Agregar notificaciones

- [ ] Mejorar componentes existentes
  - [ ] `components/BuildingForm/BuildingForm.tsx`
    - [ ] Verificar validaciones completas
    - [ ] Loading state en botón submit
    - [ ] Deshabilitar form durante mutación
  - [ ] `components/TableSkeleton.tsx`
    - [ ] Usar mientras isLoading en useBuildings

- [ ] Mejorar `pages/BuildingsListPage.tsx`
  - [ ] Mostrar TableSkeleton si isLoading
  - [ ] Mostrar `BuildingsEmptyState` si no hay datos
  - [ ] Verificar botón "Nuevo Edificio" funciona
  - [ ] Modal para create/edit con BuildingForm

- [ ] Mejorar [`pages/BuildingDetailPage.tsx`](packages/frontend/src/features/buildings/pages/BuildingDetailPage.tsx)
  - [ ] useBuilding hook para cargar detalle
  - [ ] Tabs: "Información General", "Áreas Comunes" (vacío por ahora)
  - [ ] Botón editar (abre modal)
  - [ ] Botón eliminar (confirmación + delete mutation)

### Testing Fase 2

- [ ] Backend: Probar endpoints protegidos
  - [ ] GET /buildings (con token) → lista edificios
  - [ ] POST /buildings (sin token) → 401
  - [ ] POST /buildings (con token RESIDENT) → 403
  - [ ] POST /buildings (con token ADMIN) → crea edificio

- [ ] Frontend: Probar CRUD completo
  - [ ] Login como admin
  - [ ] Listar edificios
  - [ ] Crear nuevo edificio
  - [ ] Editar edificio
  - [ ] Ver detalle
  - [ ] Eliminar edificio (con confirmación)

---

## 🏛️ FASE 3: Áreas Comunes (2 días)

> **Objetivo:** CRUD de áreas comunes vinculadas a edificios

### Backend - CommonAreas Module

- [ ] Generar módulo
  - [ ] `nest g resource common-areas --no-spec`

- [ ] Crear DTOs en `src/common-areas/dto/`
  - [ ] `CreateCommonAreaDto`
    ```typescript
    buildingId: number;
    name: string;
    description?: string;
    capacity: number;
    maxHoursPerReservation?: number;
    openTime?: string; // HH:mm
    closeTime?: string; // HH:mm
    daysAvailable?: string[];
    ```
  - [ ] `UpdateCommonAreaDto` - PartialType
  - [ ] Agregar decoradores de validación

- [ ] Implementar `common-areas.service.ts`
  - [ ] `findAll(buildingId?: number)`
    - [ ] Si buildingId: filtrar `where: { buildingId }`
    - [ ] Incluir relación building
  - [ ] `findOne(id)` - incluir building
  - [ ] `create(dto)`
    - [ ] Validar que buildingId existe
    - [ ] Crear área común
  - [ ] `update(id, dto)` - actualizar
  - [ ] `remove(id)` - soft delete (isActive = false)

- [ ] Implementar `common-areas.controller.ts`
  - [ ] `GET /common-areas?buildingId=xxx` - con @Query
  - [ ] `GET /common-areas/:id`
  - [ ] `POST /common-areas` - @UseGuards + @Roles('ADMIN', 'MANAGER')
  - [ ] `PATCH /common-areas/:id` - @UseGuards + @Roles('ADMIN', 'MANAGER')
  - [ ] `DELETE /common-areas/:id` - @UseGuards + @Roles('ADMIN', 'MANAGER')

- [ ] Registrar en `app.module.ts`

- [ ] Actualizar seeder
  - [ ] Agregar 3 áreas comunes por cada edificio
  - [ ] Ejemplos: "Salón de Eventos", "Piscina", "Gimnasio"

### Frontend - CommonAreas Module

- [ ] Crear estructura `features/common-areas/`
  - [ ] `types/common-area.types.ts`
  - [ ] `services/common-areas.service.ts`
  - [ ] `hooks/queries/useCommonAreas.ts`
  - [ ] `hooks/queries/useCommonArea.ts`
  - [ ] `hooks/mutations/useCreateCommonArea.ts`
  - [ ] `hooks/mutations/useUpdateCommonArea.ts`
  - [ ] `hooks/mutations/useDeleteCommonArea.ts`
  - [ ] `components/CommonAreaCard.tsx`
  - [ ] `components/CommonAreaForm.tsx`
  - [ ] `components/CommonAreasList.tsx`

- [ ] Implementar tipos `types/common-area.types.ts`
  - [ ] Interface CommonArea (todos los campos)
  - [ ] Interface CreateCommonAreaDto
  - [ ] Interface UpdateCommonAreaDto

- [ ] Implementar servicio `services/common-areas.service.ts`
  - [ ] `getCommonAreas(buildingId?: number)`
  - [ ] `getCommonArea(id: number)`
  - [ ] `createCommonArea(dto)`
  - [ ] `updateCommonArea(id, dto)`
  - [ ] `deleteCommonArea(id)`

- [ ] Implementar hooks
  - [ ] `useCommonAreas(buildingId?)` - useQuery
  - [ ] `useCreateCommonArea()` - useMutation con notificaciones
  - [ ] `useUpdateCommonArea()` - useMutation
  - [ ] `useDeleteCommonArea()` - useMutation con confirmación

- [ ] Crear `components/CommonAreaCard.tsx`
  - [ ] Card de Mantine
  - [ ] Mostrar: nombre, descripción, capacidad, horarios
  - [ ] Badge: isActive
  - [ ] Action buttons: editar, eliminar

- [ ] Crear `components/CommonAreaForm.tsx`
  - [ ] useForm de Mantine
  - [ ] Campos: name, description, capacity, maxHoursPerReservation
  - [ ] TimeInput para openTime y closeTime
  - [ ] MultiSelect para daysAvailable
  - [ ] Modo create y edit

- [ ] Crear `components/CommonAreasList.tsx`
  - [ ] Grid de CommonAreaCard
  - [ ] Botón "Nueva Área Común"
  - [ ] Modal con CommonAreaForm
  - [ ] Empty state si no hay áreas

- [ ] Integrar en `BuildingDetailPage.tsx`
  - [ ] Tab "Áreas Comunes"
  - [ ] Renderizar CommonAreasList
  - [ ] Pasar buildingId como filtro

### Testing Fase 3

- [ ] Backend
  - [ ] GET /common-areas?buildingId=1 → lista áreas del edificio
  - [ ] POST /common-areas → crea área (solo ADMIN)

- [ ] Frontend
  - [ ] Ver detalle de edificio
  - [ ] Tab "Áreas Comunes" muestra lista
  - [ ] Crear nueva área común
  - [ ] Editar área
  - [ ] Eliminar área

---

## 📅 FASE 4: Sistema de Reservaciones (3-4 días)

> **Objetivo:** Feature estrella - reservar áreas comunes con validaciones

### Backend - Reservations Module

- [ ] Generar módulo
  - [ ] `nest g resource reservations --no-spec`

- [ ] Crear DTOs en `src/reservations/dto/`
  - [ ] `CreateReservationDto`
    ```typescript
    commonAreaId: number;
    residentId: number;
    startTime: Date;
    endTime: Date;
    attendees?: number;
    notes?: string;
    ```
  - [ ] `FilterReservationsDto`
    ```typescript
    residentId?: number;
    commonAreaId?: number;
    buildingId?: number;
    startDate?: Date;
    endDate?: Date;
    ```

- [ ] Implementar validaciones en `reservations.service.ts`
  - [ ] Helper: `validateNoOverlap(commonAreaId, startTime, endTime)`
    - [ ] Query reservations con solapamiento
    - [ ] WHERE commonAreaId AND status != CANCELLED
    - [ ] AND ((startTime BETWEEN ? AND ?) OR (endTime BETWEEN ? AND ?))
    - [ ] Si existe: throw ConflictException
  - [ ] Helper: `validateTimeRules(commonArea, startTime, endTime)`
    - [ ] Validar horario dentro de openTime/closeTime
    - [ ] Validar duración <= maxHoursPerReservation
    - [ ] Validar día está en daysAvailable
  - [ ] Helper: `validateResident(residentId)`
    - [ ] Verificar que resident existe
  - [ ] Helper: `validateCommonArea(commonAreaId)`
    - [ ] Verificar que existe y isActive = true

- [ ] Implementar métodos en `reservations.service.ts`
  - [ ] `findAll(filters: FilterReservationsDto)`
    - [ ] Query con where dinámico según filtros
    - [ ] Include: commonArea, resident
    - [ ] OrderBy: startTime desc
  - [ ] `findOne(id)` - con relaciones
  - [ ] `create(dto)`
    - [ ] Ejecutar todas las validaciones
    - [ ] Si pasan: crear reservación con status CONFIRMED
  - [ ] `cancel(id, userId)`
    - [ ] Verificar que reservación existe
    - [ ] Verificar que userId es el owner
    - [ ] Actualizar status a CANCELLED
  - [ ] `getAvailableSlots(commonAreaId: number, date: Date)`
    - [ ] Obtener commonArea con horarios
    - [ ] Generar slots desde openTime hasta closeTime
    - [ ] Filtrar slots ocupados por reservaciones existentes
    - [ ] Retornar array de slots disponibles

- [ ] Implementar `reservations.controller.ts`
  - [ ] `GET /reservations` - con @Query(FilterReservationsDto)
  - [ ] `GET /reservations/:id`
  - [ ] `POST /reservations` - @UseGuards(JwtAuthGuard)
  - [ ] `PATCH /reservations/:id/cancel` - @UseGuards + validar ownership
  - [ ] `GET /reservations/available-slots` - @Query(commonAreaId, date)

- [ ] Registrar en `app.module.ts`

- [ ] Actualizar seeder
  - [ ] Crear 2 residentes
  - [ ] Crear 2-3 reservaciones de ejemplo

### Frontend - Reservations Module

- [ ] Crear estructura `features/reservations/`
  - [ ] `types/reservation.types.ts`
  - [ ] `services/reservations.service.ts`
  - [ ] `hooks/queries/useReservations.ts`
  - [ ] `hooks/queries/useAvailableSlots.ts`
  - [ ] `hooks/mutations/useCreateReservation.ts`
  - [ ] `hooks/mutations/useCancelReservation.ts`
  - [ ] `components/ReservationCalendar.tsx`
  - [ ] `components/ReservationForm.tsx`
  - [ ] `components/ReservationCard.tsx`
  - [ ] `components/ReservationsList.tsx`
  - [ ] `pages/ReservationsPage.tsx`

- [ ] Implementar tipos
  - [ ] Interface Reservation
  - [ ] Interface CreateReservationDto
  - [ ] Interface AvailableSlot
  - [ ] Enum ReservationStatus

- [ ] Implementar servicio
  - [ ] `getReservations(filters)`
  - [ ] `getReservation(id)`
  - [ ] `createReservation(dto)`
  - [ ] `cancelReservation(id)`
  - [ ] `getAvailableSlots(commonAreaId, date)`

- [ ] Implementar hooks
  - [ ] `useReservations(filters)` - useQuery
  - [ ] `useAvailableSlots(commonAreaId, date)` - useQuery habilitado condicionalmente
  - [ ] `useCreateReservation()` - useMutation con notificaciones
  - [ ] `useCancelReservation()` - useMutation con confirmación

- [ ] Crear `components/ReservationCalendar.tsx`
  - [ ] Usar Calendar de Mantine
  - [ ] Mostrar días con reservaciones (indicador visual)
  - [ ] onClick en día: abrir modal de reservación

- [ ] Crear `components/ReservationForm.tsx`
  - [ ] Select: Edificio (useBuildings)
  - [ ] Select: Área Común (useCommonAreas filtrado por buildingId)
  - [ ] DatePicker: Fecha
  - [ ] TimeInput: Hora inicio
  - [ ] TimeInput: Hora fin
  - [ ] NumberInput: Asistentes
  - [ ] Textarea: Notas
  - [ ] useAvailableSlots: mostrar slots disponibles al seleccionar área y fecha
  - [ ] Validación: hora fin > hora inicio
  - [ ] Submit: useCreateReservation

- [ ] Crear `components/ReservationCard.tsx`
  - [ ] Card con info: área común, fecha, horario
  - [ ] Badge: status (CONFIRMED, CANCELLED)
  - [ ] Botón "Cancelar" si status = CONFIRMED

- [ ] Crear `components/ReservationsList.tsx`
  - [ ] Stack de ReservationCard
  - [ ] Filtros: edificio, área común
  - [ ] Empty state

- [ ] Mejorar [`pages/ReservationsPage.tsx`](packages/frontend/src/features/buildings/pages/ReservationsPage.tsx)
  - [ ] Grid con 2 columnas
  - [ ] Columna izquierda: ReservationCalendar
  - [ ] Columna derecha: ReservationsList ("Mis Reservaciones")
  - [ ] Botón: "Nueva Reservación" (abre modal con ReservationForm)
  - [ ] useReservations filtrado por userId actual

### Testing Fase 4

- [ ] Backend
  - [ ] POST /reservations con datos válidos → crea
  - [ ] POST /reservations con overlap → 409 Conflict
  - [ ] POST /reservations fuera de horario → 400 Bad Request
  - [ ] GET /reservations/available-slots → retorna slots

- [ ] Frontend
  - [ ] Abrir página de reservaciones
  - [ ] Seleccionar edificio y área común
  - [ ] Ver slots disponibles
  - [ ] Crear reservación
  - [ ] Ver en "Mis Reservaciones"
  - [ ] Cancelar reservación

---

## 🌐 FASE 5: Despliegue (1-2 días)

### Backend - Preparación

- [ ] Configurar variables de entorno
  - [ ] Crear `.env.example`
    ```
    DATABASE_URL=
    JWT_SECRET=
    NODE_ENV=development
    PORT=3000
    CORS_ORIGIN=http://localhost:5173
    ```

- [ ] Verificar scripts en `package.json`
  - [ ] `"build": "nest build"`
  - [ ] `"start:prod": "node dist/main.js"`
  - [ ] `"prisma:deploy": "npx prisma migrate deploy"`

- [ ] Configurar main.ts para producción
  - [ ] CORS: leer desde env
  - [ ] Global prefix: '/api' (opcional)
  - [ ] ValidationPipe global

### Backend - Deploy Railway

- [ ] Crear cuenta en Railway (railway.app)

- [ ] Crear nuevo proyecto
  - [ ] Connect GitHub repository
  - [ ] Seleccionar rama: main

- [ ] Agregar PostgreSQL
  - [ ] New → Database → PostgreSQL
  - [ ] Variable DATABASE_URL se genera automáticamente

- [ ] Configurar servicio backend
  - [ ] Root Directory: `packages/backend`
  - [ ] Build Command: `pnpm install && pnpm run build`
  - [ ] Start Command: `pnpm run start:prod`

- [ ] Agregar variables de entorno
  - [ ] `DATABASE_URL` (ya existe)
  - [ ] `JWT_SECRET` - generar: `openssl rand -base64 32`
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=3000`
  - [ ] `CORS_ORIGIN` (actualizar después con URL de Vercel)

- [ ] Deploy
  - [ ] Push a GitHub → auto-deploy
  - [ ] O manual: "Deploy Now"

- [ ] Ejecutar migraciones
  - [ ] Desde Railway CLI o dashboard
  - [ ] `npx prisma migrate deploy`

- [ ] Ejecutar seeder
  - [ ] `npx prisma db seed`

- [ ] Verificar
  - [ ] Abrir URL de Railway
  - [ ] Probar: GET /api (si configuraste prefix)
  - [ ] Probar: POST /auth/login

### Frontend - Preparación

- [ ] Configurar env
  - [ ] Crear `.env.example`
    ```
    VITE_API_URL=http://localhost:3000
    ```
  - [ ] Crear `.env.production`
    ```
    VITE_API_URL=https://tu-backend.railway.app
    ```

- [ ] Verificar build local
  - [ ] `cd packages/frontend && pnpm run build`
  - [ ] Verificar que dist/ se genera sin errores

### Frontend - Deploy Vercel

- [ ] Crear cuenta en Vercel (vercel.com)

- [ ] Importar proyecto
  - [ ] New Project → Import Git Repository
  - [ ] Seleccionar repo de GitHub

- [ ] Configurar proyecto
  - [ ] Framework Preset: Vite
  - [ ] Root Directory: `packages/frontend`
  - [ ] Build Command: `pnpm install && pnpm run build`
  - [ ] Output Directory: `dist`
  - [ ] Install Command: `pnpm install`

- [ ] Agregar variables de entorno
  - [ ] `VITE_API_URL=https://tu-backend.railway.app`

- [ ] Deploy
  - [ ] Click "Deploy"
  - [ ] Esperar build (2-3 min)

- [ ] Actualizar CORS en Railway
  - [ ] Ir a Railway → Variables
  - [ ] Actualizar `CORS_ORIGIN=https://tu-app.vercel.app`
  - [ ] Redeploy backend

### Testing Post-Deploy

- [ ] Smoke testing completo
  - [ ] Abrir app en Vercel
  - [ ] Login con credenciales del seeder
    - [ ] Email: admin@demo.com
    - [ ] Password: password123
  - [ ] Listar edificios
  - [ ] Crear edificio nuevo
  - [ ] Ver detalle de edificio
  - [ ] Ver áreas comunes
  - [ ] Crear área común
  - [ ] Ir a página de reservaciones
  - [ ] Crear reservación
  - [ ] Ver mis reservaciones
  - [ ] Cancelar reservación
  - [ ] Logout

- [ ] Verificar en mobile
  - [ ] Abrir desde teléfono
  - [ ] Navegar por la app
  - [ ] Verificar que sea usable

---

## 📝 FASE 6: Polish y README (1 día)

### Frontend - UX Final

- [ ] Notificaciones
  - [ ] Importar Notifications en main.tsx
  - [ ] Success: verde con ícono de check
  - [ ] Error: rojo con mensaje descriptivo
  - [ ] Posición: top-right

- [ ] Loading states
  - [ ] Skeletons en todas las listas
  - [ ] Loading en botones: `<Button loading={isLoading}>`
  - [ ] Spinner global durante navegación (opcional)

- [ ] Confirmaciones
  - [ ] Modal de confirmación antes de eliminar
  - [ ] Modal antes de cancelar reservación
  - [ ] Usar modals.openConfirmModal de Mantine

- [ ] Empty states
  - [ ] Edificios: "No hay edificios registrados. Crea uno nuevo."
  - [ ] Áreas comunes: "No hay áreas comunes en este edificio."
  - [ ] Reservaciones: "No tienes reservaciones activas."
  - [ ] Ícono + mensaje + CTA button

- [ ] Errores
  - [ ] Mensajes descriptivos en español
  - [ ] Validaciones en tiempo real
  - [ ] Deshabilitar submit si hay errores

### Backend - Cleanup

- [ ] Eliminar console.log
- [ ] Formatear código: `pnpm run format`
- [ ] Lintear: `pnpm run lint`
- [ ] Verificar imports no usados

### Frontend - Cleanup

- [ ] Eliminar console.log
- [ ] Eliminar imports no usados
- [ ] Formatear: `pnpm run format`
- [ ] Lintear: `pnpm run lint`

### README Profesional

- [ ] Tomar screenshots
  - [ ] Login page
  - [ ] Buildings list
  - [ ] Building detail con áreas comunes
  - [ ] Reservations page con calendario
  - [ ] Guardar en `docs/screenshots/`

- [ ] Actualizar [`README.md`](README.md) principal

  ```markdown
  # 🏢 Sistema de Gestión de Edificios

  Sistema fullstack para gestionar edificios, áreas comunes y reservaciones.

  ## 🚀 Demo en Vivo

  - **Aplicación:** https://tu-app.vercel.app
  - **API:** https://tu-backend.railway.app/api
  - **Documentación API:** https://tu-backend.railway.app/api

  **Credenciales de prueba:**

  - Admin: admin@demo.com / password123

  ## ✨ Características

  - ✅ Autenticación JWT con roles (Admin, Manager, Resident)
  - ✅ CRUD completo de edificios
  - ✅ Gestión de áreas comunes
  - ✅ Sistema de reservaciones con validación de horarios
  - ✅ Prevención de solapamiento de reservaciones
  - ✅ Interfaz responsive y moderna

  ## 🛠 Stack Tecnológico

  **Backend:**

  - NestJS
  - Prisma ORM
  - PostgreSQL
  - JWT Authentication
  - TypeScript

  **Frontend:**

  - React 18
  - TypeScript
  - Mantine UI
  - TanStack Query
  - React Router
  - Axios

  **DevOps:**

  - Railway (Backend + PostgreSQL)
  - Vercel (Frontend)
  - GitHub Actions (CI/CD)
  - Docker (Desarrollo local)

  ## 📦 Instalación Local

  ### Prerequisitos

  - Node.js 18+
  - pnpm 8+
  - Docker

  ### Pasos

  [instrucciones detalladas]

  ## 📸 Screenshots

  [insertar imágenes]

  ## 🏗 Arquitectura

  [diagrama o descripción]

  ## 📚 API Documentation

  Swagger disponible en: `https://tu-backend.railway.app/api`

  ## 👤 Autor

  [Tu nombre] - [LinkedIn] - [Portfolio]
  ```

- [ ] Crear `packages/backend/README.md`
  - [ ] Documentar estructura del proyecto
  - [ ] Documentar principales endpoints
  - [ ] Explicar modelos de datos

- [ ] Crear `packages/frontend/README.md`
  - [ ] Documentar estructura de features
  - [ ] Explicar patrón de hooks
  - [ ] Guía de componentes

### Git Final

- [ ] Review commits
  - [ ] Verificar mensajes descriptivos
  - [ ] Squash si es necesario

- [ ] Actualizar .gitignore
  - [ ] Verificar que .env no está trackeado
  - [ ] Verificar que node_modules no está trackeado

- [ ] Tag de versión
  - [ ] `git tag v1.0.0`
  - [ ] `git push --tags`

---

## ✅ Checklist Pre-Portfolio

- [ ] ✅ App desplegada 24/7
- [ ] ✅ Login funciona
- [ ] ✅ CRUD edificios funciona
- [ ] ✅ CRUD áreas comunes funciona
- [ ] ✅ Sistema reservaciones funciona
- [ ] ✅ Validación de solapamiento funciona
- [ ] ✅ Responsive en mobile
- [ ] ✅ Sin errores en consola
- [ ] ✅ Sin warnings TypeScript
- [ ] ✅ README con screenshots
- [ ] ✅ Links en CV/LinkedIn
- [ ] ✅ Credenciales de demo funcionan

---

## 🎯 Lo Que Este Proyecto Demuestra

**Backend Skills:**

- ✅ NestJS con arquitectura modular
- ✅ Prisma ORM con relaciones complejas
- ✅ Autenticación JWT completa (Strategy, Guards, Decorators)
- ✅ Validaciones de negocio complejas (no-overlapping)
- ✅ DTOs con class-validator
- ✅ RESTful API design
- ✅ Manejo apropiado de errores
- ✅ Seeders para datos de prueba

**Frontend Skills:**

- ✅ React 18 con TypeScript
- ✅ Context API para estado global
- ✅ TanStack Query (data fetching, cache, mutations)
- ✅ Mantine UI (componentes modernos)
- ✅ Formularios complejos con validaciones
- ✅ Protected routes y autorización
- ✅ Axios con interceptors
- ✅ Arquitectura escalable por features

**DevOps Skills:**

- ✅ Monorepo con pnpm workspaces
- ✅ Docker para desarrollo local
- ✅ Deploy en Railway (backend + DB)
- ✅ Deploy en Vercel (frontend)
- ✅ Variables de entorno por ambiente
- ✅ CI/CD automático

---

## ⏱️ Cronograma Realista

| Fase      | Duración       | Entregable                                 |
| --------- | -------------- | ------------------------------------------ |
| Fase 1    | 2-3 días       | Auth completo (backend + frontend)         |
| Fase 2    | 2-3 días       | Buildings CRUD (backend + frontend)        |
| Fase 3    | 2 días         | CommonAreas CRUD (backend + frontend)      |
| Fase 4    | 3-4 días       | Reservations completo (backend + frontend) |
| Fase 5    | 1-2 días       | Deploy en Railway + Vercel                 |
| Fase 6    | 1 día          | Polish + README profesional                |
| **TOTAL** | **11-15 días** | **MVP Portfolio-Ready**                    |

---

🚀 **¿Listo para comenzar con la Fase 1: Autenticación?**
