# 🏢 My Buildings - Enterprise Building Management System

## 🎯 Objetivo

Crear un sistema funcional y desplegado que demuestre habilidades fullstack completas. Cada fase implementa un feature completo (Backend + Frontend).

---

## 🏗️ FASE 1: Autenticación y Login ✅

> **Objetivo:** Sistema de autenticación completo funcionando end-to-end

### Backend - User Model y Auth

- [x] Actualizar Prisma Schema
- [x] Agregar modelo User
- [x] Instalar dependencias JWT

  ```bash
  cd packages/backend
  pnpm add @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
  pnpm add -D @types/passport-jwt @types/bcrypt
  ```

- [x] Generar módulo Auth
  - [x] `nest g res auth --no-spec`

- [x] Crear DTOs en `src/auth/dto/`
  - [x] `RegisterDto` - email, password, firstName, lastName
  - [x] `LoginDto` - email, password
  - [x] Agregar decoradores de validación

- [x] Implementar `auth.service.ts`
  - [x] Inyectar PrismaService y JwtService
  - [x] `register(dto)` - hashear password (bcrypt, 10 rounds), crear usuario
  - [x] `login(dto)` - validar credenciales, generar JWT
  - [x] `validateUser(email, password)` - comparar hash
  - [x] `generateToken(user)` - payload: { sub: user.id, email, role }

- [x] Crear `jwt.strategy.ts`
  - [x] Extender PassportStrategy(Strategy)
  - [x] Constructor con secretOrKey desde env
  - [x] Método validate(payload) - retornar user desde DB

- [x] Crear guards en `src/auth/guards/`
  - [x] `jwt-auth.guard.ts` - extender AuthGuard('jwt')
  - [x] `roles.guard.ts` - verificar roles del usuario

- [x] Crear decorators en `src/auth/decorators/`
  - [x] `roles.decorator.ts` - `@Roles(...roles: string[])`
  - [x] `current-user.decorator.ts` - `@CurrentUser()` extrae req.user

- [x] Implementar `auth.controller.ts`
  - [x] `POST /auth/register` - público
  - [x] `POST /auth/login` - público, retorna { user, access_token }
  - [x] `GET /auth/me` - protegido con @UseGuards(JwtAuthGuard)

- [x] Configurar AuthModule
  - [x] Importar JwtModule.register({ secret, signOptions: { expiresIn: '24h' } })
  - [x] Importar PassportModule
  - [x] Providers: AuthService, JwtStrategy
  - [x] Exports: AuthService, JwtStrategy

- [x] Registrar en `app.module.ts`

- [x] Configurar CORS básico en `main.ts`

### Frontend - Auth Module

- [x] Crear estructura `packages/frontend/src/features/auth/`
  - [x] `types/auth.types.ts`
  - [x] `services/auth.service.ts`
  - [x] `context/AuthContext.tsx`
  - [x] `pages/LoginPage.tsx`

- [x] Crear servicio `services/auth.service.ts`
  - [x] `login(dto: LoginDto)` - POST /auth/login
  - [x] `register(dto: RegisterDto)` - POST /auth/register
  - [x] `getMe()` - GET /auth/me

- [x] Configurar Axios en [`lib/axios.ts`](packages/frontend/src/lib/axios.ts)
  - [x] Request interceptor: agregar Authorization header
    ```typescript
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    ```
  - [x] Response interceptor: capturar 401
    ```typescript
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    ```

- [x] Crear AuthContext en `context/AuthContext.tsx`
  - [x] Estado: user, token, isAuthenticated, isLoading
  - [x] Actions: login, logout, checkAuth
  - [x] Guardar token en localStorage (TO DO: despues cambiar a metodo por cookies)
  - [x] useEffect para restaurar sesión al montar

- [x] Crear `pages/LoginPage.tsx`
  - [x] useForm de Mantine
  - [x] Campos: email (validación email), password (min 6)
  - [x] useMutation para login
  - [x] Mostrar errores con notificaciones
  - [x] Al éxito: guardar token, navegar a /

- [x] Crear `components/ProtectedRoute.tsx`

- [x] Actualizar rutas en `src/app/routes/`
  - [x] Rutas públicas: /login
  - [x] Rutas protegidas: wrap con ProtectedRoute

- [x] Agregar User Menu en header
  - [x] Mostrar nombre del usuario
  - [x] Item: Logout (onClick → logout del context)

- [x] Envolver app con AuthProvider en `main.tsx` o `App.tsx`

### Testing Fase 1

- [x] Backend: Probar con Postman
  - [x] POST /auth/register → crea usuario
  - [x] POST /auth/login → retorna token
  - [x] GET /auth/me → retorna usuario (con token)

- [x] Frontend: Probar flujo completo
  - [x] Abrir /login
  - [x] Login con credenciales
  - [x] Verificar redirect a home
  - [x] Verificar token en localStorage
  - [x] Logout y verificar redirect

---

## 🏢 FASE 2: Buildings CRUD Completo ✅

> **Objetivo:** Gestión completa de edificios end-to-end con autenticación

### Backend - Buildings Module

- [x] Mejorar [`buildings.service.ts`](packages/backend/src/buildings/buildings.service.ts)
  - [x] Método `create()`
    - [x] Envolver en try-catch
    - [x] Si no existe el user: `throw new BadRequestException('Manager not found')`
    - [x] Capturar errores de Prisma (unique constraints)
  - [x] Método `update()`
    - [x] Agregar try-catch
    - [x] Verificar que building existe primero
    - [x] Si no existe: `throw new NotFoundException()`
  - [x] Método `remove()`
    - [x] Verificar que existe antes de soft delete
    - [x] Manejar errores apropiadamente

- [x] Proteger `buildings.controller.ts`
  - [x] Agregar `@UseGuards(JwtAuthGuard, RolesGuard)` a nivel de controller
  - [x] `@Roles()` en create, update, delete

- [x] Crear seeder inicial `prisma/seed.ts`
  - [x] Crear 1 usuario admin (email: admin@demo.com, pass: password123)
  - [x] Crear 2 edificios

### Frontend - Buildings Module

- [x] Verificar estructura existente en `features/buildings/`

- [x] Actualizar hooks de mutaciones
  - [x] `hooks/mutations/useCreateBuilding.ts`
    - [x] Agregar `onSuccess`: `notifications.show({ title: 'Éxito', message: 'Edificio creado' })`
    - [x] Agregar `onError`: `notifications.show({ title: 'Error', message: error.message, color: 'red' })`
  - [x] `hooks/mutations/useUpdateBuilding.ts`
    - [x] Agregar notificaciones similares

- [x] Mejorar componentes existentes
  - [x] `components/BuildingForm/BuildingForm.tsx`
    - [x] Verificar validaciones completas
    - [x] Loading state en botón submit
    - [x] Deshabilitar form durante mutación
  - [x] `components/TableSkeleton.tsx`
    - [x] Usar mientras isLoading en useBuildings

- [x] Mejorar `pages/BuildingsListPage.tsx`
  - [x] Mostrar TableSkeleton si isLoading
  - [x] Mostrar `BuildingsEmptyState` si no hay datos
  - [x] Verificar botón "Nuevo Edificio" funciona
  - [x] Modal para create/edit con BuildingForm

- [x] Mejorar [`pages/BuildingDetailPage.tsx`](packages/frontend/src/features/buildings/pages/BuildingDetailPage.tsx)
  - [x] useBuilding hook para cargar detalle
  - [x] Tabs: "Información General", "Áreas Comunes", "Amenities"
  - [x] Botón editar (abre modal)
  - [x] Botón eliminar (confirmación + delete mutation)

### Testing Fase 2

- [x] Backend: Probar endpoints protegidos
  - [x] GET /buildings (con token) → lista edificios
  - [x] POST /buildings (sin token) → 401
  - [x] POST /buildings (con token RESIDENT) → 403

- [x] Frontend: Probar CRUD completo
  - [x] Login como admin
  - [x] Listar edificios
  - [x] Crear nuevo edificio
  - [x] Editar edificio
  - [x] Ver detalle
  - [x] Eliminar edificio (con confirmación)

---

## 🏛️ FASE 3: Áreas Comunes ✅

> **Objetivo:** CRUD de áreas comunes vinculadas a edificios

### Backend - CommonAreas Module

- [x] Generar módulo
  - [x] `nest g resource common-areas --no-spec`

- [x] Crear DTOs en `src/common-areas/dto/`
  - [x] `CreateCommonAreaDto`
  - [x] `UpdateCommonAreaDto` - PartialType
  - [x] Agregar decoradores de validación

- [x] Implementar `common-areas.service.ts`
  - [x] `findAll(buildingId?: number)`
    - [x] Incluir relación building
  - [x] `create(dto)`
    - [x] Validar que buildingId existe
    - [x] Crear área común
  - [x] `update(id, dto)` - actualizar
  - [x] `remove(id)` - soft delete (isActive = false)

- [x] Implementar `common-areas.controller.ts`
  - [x] `POST /common-areas` - @UseGuards + @Roles('MANAGER')
  - [x] `PATCH /common-areas/:id` - @UseGuards + @Roles('MANAGER')
  - [x] `DELETE /common-areas/:id` - @UseGuards + @Roles('MANAGER')

### Frontend - CommonAreas Module

- [x] Crear estructura `features/common-areas/`
  - [x] `types/common-area.types.ts`
  - [x] `services/common-areas.service.ts`
  - [x] `hooks/mutations/useCreateCommonArea.ts`
  - [x] `hooks/mutations/useUpdateCommonArea.ts`
  - [x] `hooks/mutations/useDeleteCommonArea.ts`
  - [x] `components/CommonAreas.tsx`

- [x] Implementar tipos `types/common-area.types.ts`
  - [x] Interface CommonArea (todos los campos)
  - [x] Interface CreateCommonAreaDto
  - [x] Interface UpdateCommonAreaDto

- [x] Implementar servicio `services/common-areas.service.ts`
  - [x] `createCommonArea(dto)`
  - [x] `updateCommonArea(id, dto)`
  - [x] `deleteCommonArea(id)`

- [x] Implementar hooks
  - [x] `useCreateCommonArea()` - useMutation con notificaciones
  - [x] `useUpdateCommonArea()` - useMutation
  - [x] `useDeleteCommonArea()` - useMutation con confirmación

- [x] Crear `components/CommonAreaForm.tsx`
- [x] Crear `components/CommonAreasList.tsx`
  - [x] Grid de CommonAreaCard
  - [x] Botón "Nueva Área Común"
  - [x] Modal con CommonAreaForm
  - [x] Empty state si no hay áreas

- [x] Integrar en `BuildingDetailPage.tsx`
  - [x] Tab "Áreas Comunes"
  - [x] Renderizar CommonAreasList

### Testing Fase 3

- [x] Backend
  - [x] POST /common-areas → crea área (MAMAGER)

- [x] Frontend
  - [x] Ver detalle de edificio
  - [x] Tab "Áreas Comunes" muestra lista
  - [x] Crear nueva área común
  - [x] Editar área
  - [x] Eliminar área

## 📅 FASE 4: Sistema de Reservaciones ✅

> **Objetivo:** Reservar áreas comunes con validaciones

### Backend - Reservations Module

- [x] Generar módulo
  - [x] `nest g resource reservations --no-spec`

- [x] Crear DTOs en `src/reservations/dto/`
  - [x] `CreateReservationDto`

- [ ] Implementar validaciones en `reservations.service.ts`
  - [x] Helper: `validateTimeRules(commonArea, startTime, endTime)`
    - [x] Validar horario dentro de openTime/closeTime
    - [x] Validar duración <= maxHoursPerReservation
    - [x] Validar día está en daysAvailable

  - [x] Helper: `validateCommonArea(commonAreaId)`
    - [x] Verificar que existe y isActive = true

- [x] Implementar métodos en `reservations.service.ts`
  - [x] `findBuildingByResidentId`
  - [x] `create(dto)`
    - [x] Ejecutar todas las validaciones
    - [x] Si pasan: crear reservación con status ON_REVIEW
  - [x] `updateReservation()`

- [x] Implementar `reservations.controller.ts`
  - [x] `POST /reservations` - @UseGuards(JwtAuthGuard)

### Frontend - Reservations Module

- [x] Crear estructura `features/reservations/`
  - [x] `types/reservation.types.ts`
  - [x] `services/reservations.service.ts`
  - [x] `hooks/mutations/useCreateReservation.ts`
  - [x] `components/ReservationCalendar.tsx`
  - [x] `components/ReservationForm.tsx`
  - [x] `components/ReservationsList.tsx`
  - [x] `pages/ReservationsPage.tsx`

- [x] Implementar tipos
  - [x] Interface CreateReservationDto

- [x] Implementar servicio
  - [x] `createReservation(dto)`
  - [x] `deleteReservation(id)`
  - [x] `getBuildingByResidentId`

- [x] Implementar hooks
  - [x] `useBuildingByResidentId()`
  - [x] `useCreateReservation()`
  - [x] `useDeleteReservation()`

- [x] Crear `components/ReservationCalendar.tsx`
  - [x] Mostrar días con reservaciones (indicador visual)
  - [x] onClick en horarios: abrir modal de reservación

- [x] Crear `components/ReservationForm.tsx`
  - [x] Select: Área Común (useCommonAreas filtrado por buildingId)
  - [x] DatePicker: Fecha
  - [x] TimeInput: Hora inicio
  - [x] TimeInput: Hora fin
  - [x] NumberInput: Asistentes
  - [x] Textarea: Notas
  - [x] Submit: useCreateReservation

- [x] Crear `components/ReservationCard.tsx`
  - [x] Card con info: área común, fecha, horario
  - [x] Badge: status (CONFIRMED, CANCELLED)
  - [x] Botón "Cancelar" si status = CONFIRMED

- [x] Crear `components/ReservationsList.tsx`
  - [x] Stack de ReservationCard
  - [x] Empty state

### Testing Fase 4

- [x] Backend
  - [x] POST /reservations con datos válidos → crea
  - [x] POST /reservations con overlap → 409 Conflict
  - [x] POST /reservations fuera de horario → 400 Bad Request

- [x] Frontend
  - [x] Abrir página de reservaciones
  - [x] Seleccionar edificio y área común
  - [x] Ver slots disponibles
  - [x] Crear reservación
  - [x] Ver en "Mis Reservaciones"
  - [x] Cancelar reservación

---

## 🌐 FASE 5: Despliegue ✅

### Backend - Preparación

- [x] Configurar variables de entorno
  - [x] Crear `.env.example`
    ```
    DATABASE_URL=
    JWT_SECRET=
    NODE_ENV=development
    PORT=3000
    CORS_ORIGIN=http://localhost:5173
    ```

- [x] Verificar scripts en `package.json`
  - [x] `"build": "nest build"`
  - [x] `"start:prod": "node dist/main.js"`
  - [x] `"prisma:deploy": "npx prisma migrate deploy"`

- [ ] Configurar main.ts para producción
  - [ ] CORS: leer desde env
  - [x] Global prefix: '/api' (opcional)
  - [x] ValidationPipe global

### Backend - Deploy Railway

- [x] Crear cuenta en Railway (railway.app)

- [x] Crear nuevo proyecto
  - [x] Connect GitHub repository
  - [x] Seleccionar rama: main

- [x] Agregar PostgreSQL
  - [x] New → Database → PostgreSQL
  - [x] Variable DATABASE_URL se genera automáticamente

- [x] Configurar servicio backend
  - [x] Root Directory: `packages/backend`
  - [x] Build Command: `pnpm install && pnpm run build`
  - [x] Start Command: `pnpm run start:prod`

- [x] Agregar variables de entorno
  - [x] `DATABASE_URL` (ya existe)
  - [x] `JWT_SECRET` - generar: `openssl rand -base64 32`
  - [x] `NODE_ENV=production`
  - [x] `PORT=3000`
  - [x] `CORS_ORIGIN` (actualizar después con URL de Vercel)

- [x] Deploy
  - [x] Push a GitHub → auto-deploy
  - [x] O manual: "Deploy Now"

- [x] Ejecutar migraciones
  - [x] Desde Railway CLI o dashboard
  - [x] `npx prisma migrate deploy`

- [x] Verificar
  - [x] Abrir URL de Railway
  - [x] Probar: GET /api (si configuraste prefix)
  - [x] Probar: POST /auth/login

### Frontend - Preparación

- [x] Configurar env
  - [x] Crear `.env.example`
    ```
    VITE_API_URL=http://localhost:3000
    ```
  - [x] Crear `.env.production`
    ```
    VITE_API_URL=https://tu-backend.railway.app
    ```

- [x] Verificar build local
  - [x] `cd packages/frontend && pnpm run build`
  - [x] Verificar que dist/ se genera sin errores

### Frontend - Deploy Vercel

- [x] Crear cuenta en Vercel (vercel.com)

- [x] Importar proyecto
  - [x] New Project → Import Git Repository
  - [x] Seleccionar repo de GitHub

- [x] Configurar proyecto
  - [x] Framework Preset: Vite
  - [x] Root Directory: `packages/frontend`
  - [x] Build Command: `pnpm install && pnpm run build`
  - [x] Output Directory: `dist`
  - [x] Install Command: `pnpm install`

- [x] Agregar variables de entorno
  - [x] `VITE_API_URL=https://tu-backend.railway.app`

- [x] Deploy
  - [x] Click "Deploy"

- [x] Actualizar CORS en Railway
  - [x] Ir a Railway → Variables
  - [x] Actualizar `CORS_ORIGIN=https://tu-app.vercel.app`
  - [x] Redeploy backend

### Testing Post-Deploy

- [ ] Smoke testing completo
  - [x] Abrir app en Vercel
  - [x] Login con credenciales del seeder
  - [x] Listar edificios
  - [x] Crear edificio nuevo
  - [x] Ver detalle de edificio
  - [x] Ver áreas comunes
  - [x] Crear área común
  - [x] Ir a página de reservaciones
  - [x] Crear reservación
  - [x] Ver mis reservaciones
  - [x] Logout

---

## 📝 FASE 6: Polish y README

### Frontend

- [x] Loading states
  - [x] Skeletons en todas las listas
  - [x] Loading en botones: `<Button loading={isLoading}>`
  - [x] Spinner global durante navegación (opcional)

- [x] Confirmaciones
  - [x] Modal de confirmación antes de eliminar

- [x] Empty states
  - [x] Edificios: "No hay edificios registrados. Crea uno nuevo."
  - [x] Áreas comunes: "No hay áreas comunes en este edificio."
  - [x] Reservaciones: "No tienes reservaciones activas."
  - [x] Ícono + mensaje + CTA button

- [x] Errores
  - [x] Mensajes descriptivos en español
  - [x] Validaciones en tiempo real
  - [x] Deshabilitar submit si hay errores

---

## 🔒 FASE 7: Mejoras de Seguridad y Autenticación

> **Objetivo:** Fortalecer la seguridad de la aplicación

### 🚨 PRIORIDAD CRÍTICA

#### 1. Configurar CORS correctamente

- [ ] Actualizar `main.ts` con CORS restrictivo
  ```typescript
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Operation-Name'],
  })
  ```
- [ ] Agregar `FRONTEND_URL` a variables de entorno
- [ ] Verificar que funciona en desarrollo y producción

#### 2. Implementar Rate Limiting

- [ ] Instalar dependencias
  ```bash
  cd packages/backend
  pnpm add @nestjs/throttler
  ```
- [ ] Configurar en `app.module.ts`
  ```typescript
  ThrottlerModule.forRoot([
    {
      ttl: 60000, // 1 minuto
      limit: 10, // 10 requests
    },
  ])
  ```
- [ ] Agregar ThrottlerGuard global
- [ ] Configurar límites estrictos en auth endpoints
  - [ ] Login: 5 intentos por minuto
  - [ ] Register: 3 intentos por minuto

#### 3. Migrar a HttpOnly Cookies

**Backend:**

- [ ] Instalar cookie-parser
  ```bash
  pnpm add cookie-parser
  pnpm add -D @types/cookie-parser
  ```
- [ ] Configurar cookie-parser en `main.ts`
- [ ] Modificar `auth.controller.ts`
  - [ ] Login: establecer cookie HttpOnly en response
    ```typescript
    response.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
      path: '/',
    })
    ```
  - [ ] Agregar endpoint `POST /auth/logout` que limpia la cookie
- [ ] Modificar `jwt.strategy.ts` para leer token de cookies
  ```typescript
  jwtFromRequest: ExtractJwt.fromExtractors([
    (request: Request) => request?.cookies?.accessToken,
  ])
  ```

**Frontend:**

- [ ] Actualizar `axios.ts`
  - [ ] Agregar `withCredentials: true`
  - [ ] Eliminar interceptor que agrega Authorization header
  - [ ] Simplificar response interceptor (no limpiar localStorage)
- [ ] Actualizar `AuthContext.tsx`
  - [ ] Eliminar uso de localStorage para token
  - [ ] Agregar llamada a logout endpoint
- [ ] Agregar método `logout()` en `auth.service.ts`

#### 4. Implementar Refresh Token

- [ ] Actualizar Prisma Schema

  ```prisma
  model RefreshToken {
    id        Int      @id @default(autoincrement())
    token     String   @db.Text
    userId    Int
    user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
    expiresAt DateTime
    createdAt DateTime @default(now())

    @@index([userId])
    @@map("refresh_tokens")
  }
  ```

- [ ] Ejecutar migración
- [ ] Modificar `auth.service.ts`
  - [ ] Reducir expiración de accessToken a 15 minutos
  - [ ] Generar refreshToken con expiración de 7 días
  - [ ] Guardar refreshToken hasheado en BD
  - [ ] Método `refreshAccessToken(refreshToken)`
- [ ] Agregar endpoint `POST /auth/refresh` en controller
- [ ] Frontend: implementar auto-refresh antes de expiración

#### 5. Validar JWT_SECRET fuerte

- [ ] Modificar `auth.module.ts`

  ```typescript
  useFactory: (configService: ConfigService) => {
    const secret = configService.get('JWT_SECRET')

    if (!secret || secret.length < 32) {
      throw new Error('JWT_SECRET debe tener al menos 32 caracteres')
    }

    return {
      secret,
      signOptions: {
        expiresIn: '15m',
        issuer: 'my-buildings-api',
        audience: 'my-buildings-app',
      },
    }
  }
  ```

- [ ] Actualizar `jwt.strategy.ts` con validación de issuer/audience
- [ ] Generar nuevo JWT_SECRET seguro: `openssl rand -base64 32`
- [ ] Actualizar en variables de entorno

### 🔐 PRIORIDAD ALTA

#### 6. Validación de contraseñas fuertes

- [ ] Actualizar `register-user.dto.ts`
  ```typescript
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    { message: 'La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales' }
  )
  password: string
  ```
- [ ] Agregar validación en frontend (RegisterPage)
- [ ] Mostrar indicador de fortaleza de contraseña

#### 7. Control de roles en Frontend

- [ ] Agregar `role` al tipo `AuthenticatedUser`
- [ ] Modificar `AuthContext.tsx` para incluir role del usuario
- [ ] Actualizar `ProtectedRoute.tsx`
  ```typescript
  interface ProtectedRouteProps {
    children: React.ReactNode
    requiredRoles?: UserRole[]
  }
  ```
- [ ] Validar roles antes de renderizar rutas
- [ ] Crear página `/unauthorized` para accesos denegados

#### 8. Componente RoleGuard para UI

- [ ] Crear `components/RoleGuard.tsx`
  ```typescript
  interface RoleGuardProps {
    children: React.ReactNode
    allowedRoles: UserRole[]
    fallback?: React.ReactNode
  }
  ```
- [ ] Usar en componentes para ocultar acciones según rol
  ```typescript
  <RoleGuard allowedRoles={['ADMIN']}>
    <Button onClick={handleDelete}>Eliminar</Button>
  </RoleGuard>
  ```

#### 9. Validar propiedad de recursos

- [ ] Modificar `buildings.service.ts`
  - [ ] Método `findOne()`: validar que MANAGER solo vea sus edificios
  - [ ] Método `update()`: validar ownership
  - [ ] Método `remove()`: validar ownership
- [ ] Agregar helper `validateOwnership(resourceId, userId, userRole)`
- [ ] Aplicar a todos los recursos (buildings, common-areas, reservations)

### 🛡️ PRIORIDAD MEDIA

#### 10. Helmet para headers de seguridad

- [ ] Instalar helmet
  ```bash
  pnpm add helmet
  ```
- [ ] Configurar en `main.ts`
  ```typescript
  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production',
      crossOriginEmbedderPolicy: false,
    })
  )
  ```

#### 11. Logging de eventos de seguridad

- [ ] Agregar logs en `auth.service.ts`
  - [ ] Login exitoso: `this.logger.log(\`Login exitoso: ${user.email}\`)`
  - [ ] Login fallido: `this.logger.warn(\`Intento fallido: ${email}\`)`
  - [ ] Registro exitoso: `this.logger.log(\`Nuevo usuario: ${user.email}\`)`
- [ ] Agregar logs en operaciones críticas (delete, update)
- [ ] Considerar integración con servicio de logging (Sentry, LogRocket)

#### 12. Sanitización de inputs

- [ ] Instalar class-sanitizer
  ```bash
  pnpm add class-sanitizer
  ```
- [ ] Agregar `@Trim()` a todos los DTOs con strings
- [ ] Habilitar en ValidationPipe
  ```typescript
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  )
  ```

#### 13. Mejorar configuración de Axios

- [ ] Reducir timeout de 10s a 5s
- [ ] Agregar retry logic para requests fallidos
- [ ] Implementar request cancellation en cleanup

#### 14. Variables de entorno obligatorias

- [ ] Crear validación de env en `main.ts`
  ```typescript
  const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET', 'FRONTEND_URL']
  requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
      throw new Error(\`Variable de entorno ${envVar} es requerida\`)
    }
  })
  ```
- [ ] Actualizar `.env.example` con todas las variables

### Testing de Seguridad

- [ ] Probar CORS
  - [ ] Request desde origen no permitido → debe fallar
  - [ ] Request desde origen permitido → debe funcionar

- [ ] Probar Rate Limiting
  - [ ] Hacer 6 requests de login rápidos → debe bloquear
  - [ ] Esperar 1 minuto → debe permitir nuevamente

- [ ] Probar HttpOnly Cookies
  - [ ] Intentar leer cookie desde JavaScript → debe fallar
  - [ ] Verificar que cookie se envía automáticamente

- [ ] Probar Refresh Token
  - [ ] Esperar expiración de accessToken
  - [ ] Llamar endpoint refresh → debe generar nuevo token
  - [ ] Usar refreshToken inválido → debe fallar

- [ ] Probar validación de roles
  - [ ] Login como MANAGER
  - [ ] Intentar eliminar edificio → debe fallar (403)
  - [ ] Login como ADMIN
  - [ ] Eliminar edificio → debe funcionar

- [ ] Probar ownership
  - [ ] MANAGER A crea edificio
  - [ ] MANAGER B intenta editarlo → debe fallar (403)
  - [ ] ADMIN intenta editarlo → debe funcionar

### Documentación de Seguridad

- [ ] Crear `SECURITY.md`
  - [ ] Política de contraseñas
  - [ ] Manejo de tokens
  - [ ] Roles y permisos
  - [ ] Cómo reportar vulnerabilidades

- [ ] Actualizar README con sección de seguridad
  - [ ] Mencionar HttpOnly Cookies
  - [ ] Mencionar Rate Limiting
  - [ ] Mencionar validaciones implementadas

## Fase 8: Nice to have

- [ ] Crear `pages/RegisterPage.tsx`
  - [ ] Campos: email, password, confirmPassword, firstName, lastName
  - [ ] Validación: passwords match
  - [ ] Al éxito: auto-login o navegar a /login
