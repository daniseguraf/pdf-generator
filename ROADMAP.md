# 🗺️ Development Roadmap - Building Management System

> **Duration:** 8 weeks full-time
> **Stack:** NestJS, React, TypeScript, Mantine, TanStack Query, Prisma, PostgreSQL
> **Goal:** Fully functional and deployed fullstack application

---

## 📊 Overall Progress

- [ ] **Week 1:** Setup and Foundations (0/5)
- [ ] **Week 2:** Buildings and Common Areas CRUD (0/5)
- [ ] **Week 3:** Units and Residents Management (0/5)
- [ ] **Week 4:** Booking System (0/5)
- [ ] **Week 5:** Staff and Tickets Management (0/5)
- [ ] **Week 6:** Authentication and Authorization (0/5)
- [ ] **Week 7:** Dashboard and Deployment V1 (0/5)
- [ ] **Week 8:** Polish and Documentation (0/5)

**Total Progress: 0/40 main tasks completed**

---

## 🎯 Key Milestones

| Milestone                    | Target Date   | Status     |
| ---------------------------- | ------------- | ---------- |
| 🏗️ Complete Setup            | End of Week 1 | ⏳ Pending |
| 🏢 Buildings CRUD Functional | End of Week 2 | ⏳ Pending |
| 👥 Residents Management      | End of Week 3 | ⏳ Pending |
| 📅 Booking System            | End of Week 4 | ⏳ Pending |
| 🎫 Tickets System            | End of Week 5 | ⏳ Pending |
| 🔐 Authentication Complete   | End of Week 6 | ⏳ Pending |
| 🚀 First Deployed Version    | End of Week 7 | ⏳ Pending |
| 📝 Final Documentation       | End of Week 8 | ⏳ Pending |

---

# 📅 WEEK 1: Setup and Foundations

**Goal:** Both projects running, connected, with basic data models ready.

## Days 1-2: Project Configuration

### Backend Setup

- [x] Initialize NestJS project
  - [x] Install NestJS CLI globally
  - [x] Create new project
  - [x] Install core dependencies

- [x] Configure Docker Compose
  - [x] PostgreSQL container setup
  - [x] Volume configuration for data persistence
  - [x] Network configuration

- [x] Install and configure Prisma
  - [x] Install Prisma dependencies
  - [x] Initialize Prisma
  - [x] Configure database connection

- [x] Configure environment variables
  - [x] Create `.env` file for development
  - [x] Create `.env.template` for reference
  - [x] Add to `.gitignore`
  - [x] Configure eslint-plugin-unused-imports

### Frontend Setup

- [x] Initialize Vite + React + TypeScript project
  - [x] Create new project with Vite
  - [x] Configure TypeScript

- [x] Install main dependencies
  - [x] Mantine core and hooks
  - [x] Mantine notifications and dates
  - [x] TanStack Query
  - [x] Axios
  - [x] React Router

- [x] Configure import aliases in `vite.config.ts`
  - [x] Setup `@/` path alias
  - [x] Configure resolve aliases
  - [x] Configure eslint-plugin-unused-imports

- [x] Create folder structure following architecture
  - [x] `/features` directory
  - [x] `/components` directory
  - [x] `/lib` directory
  - [x] `/hooks` directory
  - [x] `/types` directory

- [x] Configure Mantine Provider and theme
  - [x] Setup MantineProvider
  - [x] Create custom theme
  - [x] Configure global styles

### Validation

- [x] Backend responds at `http://localhost:3000`
- [x] Frontend runs at `http://localhost:5173`
- [x] Successful connection to PostgreSQL
- [x] Hot reload working in both projects

---

## Days 3-5: Data Modeling

### Backend - Prisma Schema

- [x] Design and create complete schema in `schema.prisma`
  - [x] `User` model (id, email, password, role, firstName, lastName, createdAt, updatedAt)
  - [x] `Building` model (id, name, address, city, postalCode, floors, unitsCount, phoneNumber, email, isActive, createdAt, updatedAt)
  - [x] `Unit` model (id, buildingId, number, floor, type, status, createdAt, updatedAt)
  - [x] `CommonArea` model (id, buildingId, name, description, capacity, isActive, createdAt, updatedAt)
  - [x] `Staff` model (id, buildingId, userId, role, startDate, endDate)
  - [x] `UserRole` enum (ADMIN, MANAGER, RESIDENT, STAFF)
  - [x] `UnitType` enum (APARTMENT, OFFICE, COMMERCIAL)
  - [x] `UnitStatus` enum (AVAILABLE, OCCUPIED, MAINTENANCE)
  - [x] `StaffRole` enum (MANAGER, SECURITY, MAINTENANCE, OTHER)

- [x] Run initial migration
  - [x] Generate migration
  - [x] Apply migration to database
  - [x] Verify schema in database

### Backend - Base Module Setup

- [ ] Create base modules (without auth for now)
  - [x] Generate Buildings module
  - [ ] Generate Units module
  - [ ] Generate CommonAreas module
  - [ ] Generate basic service and controller files

- [x] Setup Prisma Service
  - [x] Create PrismaService
  - [x] Setup lifecycle hooks
  - [x] Share TS types in frontend and backend

### Frontend - Base Configuration

- [x] Setup basic routing
  - [x] Install React Router
  - [x] Create router configuration
  - [x] Define initial routes structure
  - [x] Create placeholder pages

- [x] Create base layout components
  - [x] AppShell with header and sidebar
  - [x] Basic navigation menu
  - [x] Page layout wrapper

- [x] Configure Axios client in `lib/axios.ts`
  - [x] Create axios instance
  - [x] Set baseURL from environment variables
  - [x] Configure default headers
  - [x] Setup interceptors (placeholder for auth later)

- [x] Setup React Query
  - [x] Create QueryClient configuration
  - [x] Setup QueryClientProvider
  - [x] Install React Query DevTools

### Week 1 Validation

- [ ] Database schema created and seeded
- [x] Both projects communicate successfully
- [x] Basic routing works
- [ ] Development environment stable
- [x] Can query data from backend to frontend

---

# 📅 WEEK 2: Buildings and Common Areas CRUD

**Goal:** Complete management system for buildings and common areas.

## Days 1-3: Buildings Module

### Backend

- [x] Create Buildings module with full CRUD
  - [x] Generate resource with NestJS CLI
  - [x] Setup module, service, controller

- [ ] Implement DTOs
  - [x] `CreateBuildingDto` with all fields
  - [x] `UpdateBuildingDto` as partial
  - [x] Add class-validator decorators
  - [x] Custom validation rules

- [x] Implement Buildings Service
  - [x] `findAll()` method
  - [x] `findOne(id)` method with relations
  - [x] `create(dto)` method
  - [x] `update(id, dto)` method
  - [x] `remove(id)` method (soft delete)

- [ ] Implement Buildings Controller
  - [x] `GET /buildings` - basic buildings list
  - [ ] `GET /buildings/:id` - get one with relations
  - [x] `POST /buildings` - create new building
  - [x] `PATCH /buildings/:id` - update building
  - [x] `DELETE /buildings/:id` - soft delete building
  - [ ] Add proper HTTP status codes

### Frontend

- [x] Create `features/buildings/` structure
  - [x] Create `building.types.ts` with interfaces
  - [x] Create `buildings.service.ts` with API calls
  - [ ] Create custom hooks:
    - [x] `useBuildings.ts` (query for list)
    - [ ] `useBuilding.ts` (query for single)
    - [x] `useCreateBuilding.ts` (mutation)
    - [ ] `useUpdateBuilding.ts` (mutation)
    - [ ] `useDeleteBuilding.ts` (mutation)

- [ ] Create Buildings Components
  - [ ] `BuildingTable.tsx` - table with Mantine
    - [x] Columns: photo, name, address, city, floors, units
    - [ ] Actions: view, edit, delete buttons
    - [ ] Pagination component
    - [ ] Loading skeleton
    - [ ] Empty state
  - [ ] `BuildingForm.tsx` - modal form
    - [ ] All model fields as inputs
    - [ ] Validations with Mantine useForm
    - [ ] Handle create and edit modes
    - [ ] States: idle, submitting, success, error
  - [ ] `BuildingCard.tsx` - card for mobile view
  - [ ] `BuildingFilters.tsx` - search and filter inputs
  - [ ] `DeleteBuildingDialog.tsx` - confirmation modal

- [ ] Create Pages
  - [ ] `BuildingsListPage.tsx`
    - [ ] Page header with "New Building" button
    - [ ] Filters section
    - [ ] Buildings table
    - [ ] Handle modals (create, edit, delete)
  - [ ] `BuildingDetailPage.tsx`
    - [ ] Building general info
    - [ ] Tabs: Units, Common Areas, Staff (placeholder for now)
    - [ ] Edit button
    - [ ] Back button

### Validation

- [ ] Complete CRUD works end-to-end
- [ ] Frontend and backend validations working
- [ ] Success/error notifications
- [ ] React Query cache invalidation works correctly
- [ ] UI is responsive

---

## Days 4-5: Common Areas Module

### Backend

- [ ] Create CommonAreas module
  - [ ] Generate resource with NestJS CLI
  - [ ] Setup module, service, controller

- [ ] Implement DTOs
  - [ ] `CreateCommonAreaDto`
  - [ ] `UpdateCommonAreaDto`
  - [ ] Validations

- [ ] Implement CommonAreas Service
  - [ ] `findAll()` with buildingId filter
  - [ ] `findOne(id)`
  - [ ] `create(dto)` - validate buildingId exists
  - [ ] `update(id, dto)`
  - [ ] `remove(id)` - soft delete

- [ ] Implement CommonAreas Controller
  - [ ] `GET /common-areas?buildingId=xxx` - list by building
  - [ ] `GET /common-areas/:id` - get one
  - [ ] `POST /common-areas` - create
  - [ ] `PATCH /common-areas/:id` - update
  - [ ] `DELETE /common-areas/:id` - delete

### Frontend

- [ ] Create `features/common-areas/` structure
  - [ ] Types, services, hooks (same pattern)

- [ ] Create Components
  - [ ] `CommonAreaCard.tsx` - card with info
  - [ ] `CommonAreaForm.tsx` - form modal
  - [ ] `CommonAreasList.tsx` - list/grid view

- [ ] Integrate into BuildingDetailPage
  - [ ] "Common Areas" tab
  - [ ] List areas for the building
  - [ ] Button to add new area
  - [ ] Edit/delete area actions

### Week 2 Validation

- [ ] Buildings CRUD complete
- [ ] Common Areas CRUD complete
- [ ] Building → Common Areas relationship works
- [ ] Smooth navigation between views
- [ ] Errors handled properly

---

# 📅 WEEK 3: Units and Residents Management

**Goal:** Units management system and resident assignment.

## Days 1-2: Units Module

### Backend

- [ ] Create Units module
  - [ ] Generate resource
  - [ ] Setup module, service, controller

- [ ] Implement DTOs
  - [ ] `CreateUnitDto` (buildingId, number, floor, type, status)
  - [ ] `UpdateUnitDto`
  - [ ] Validation rules

- [ ] Implement Units Service
  - [ ] `findAll()` with buildingId filter
  - [ ] `findOne(id)` including building relation
  - [ ] `create(dto)` - validate unique number per building
  - [ ] `update(id, dto)`
  - [ ] `updateStatus(id, status)` - change unit status
  - [ ] `remove(id)`

- [ ] Implement Units Controller
  - [ ] Standard CRUD endpoints
  - [ ] `PATCH /units/:id/status` - change status

### Frontend

- [ ] Create `features/units/` structure
  - [ ] Types, services, hooks

- [ ] Create Components
  - [ ] `UnitCard.tsx` - card with status badge
  - [ ] `UnitForm.tsx` - form modal
  - [ ] `UnitsGrid.tsx` - grid layout
  - [ ] `UnitStatusBadge.tsx` - colored status badge

- [ ] Integrate into BuildingDetailPage
  - [ ] "Units" tab
  - [ ] Grid of units
  - [ ] Filter by floor/status
  - [ ] Add/edit units

---

## Days 3-5: Resident-Unit Assignment

### Backend

- [ ] Update Prisma schema
  - [ ] Create `ResidentUnit` model (many-to-many with history)
    - [ ] Fields: id, userId, unitId, startDate, endDate, isActive
  - [ ] Add relations: User ↔ ResidentUnit ↔ Unit
  - [ ] Run migration

- [ ] Create Residents module
  - [ ] Generate resource
  - [ ] Setup module, service, controller

- [ ] Implement Residents Service
  - [ ] `assignToUnit(userId, unitId)` - assign resident
  - [ ] `unassignFromUnit(userId, unitId)` - unassign
  - [ ] `findUnitsByResident(userId)` - resident's units
  - [ ] `findResidentsByUnit(unitId)` - unit's residents
  - [ ] `getResidentHistory(userId)` - history timeline

- [ ] Implement Residents Controller
  - [ ] `POST /residents/assign` - assign to unit
  - [ ] `POST /residents/unassign` - unassign from unit
  - [ ] `GET /residents/:id/units` - resident's units
  - [ ] `GET /units/:id/residents` - unit's residents
  - [ ] `GET /residents/:id/history` - assignment history

### Frontend

- [ ] Create `features/residents/` structure
  - [ ] Types, services, hooks

- [ ] Create Components
  - [ ] `ResidentSelector.tsx` - autocomplete for users
  - [ ] `AssignResidentModal.tsx` - assignment modal
  - [ ] `ResidentsList.tsx` - residents list
  - [ ] `ResidentHistory.tsx` - timeline component

- [ ] Create Page
  - [ ] `ResidentsPage.tsx`
    - [ ] List all residents
    - [ ] View assigned units
    - [ ] Assign to unit button

- [ ] Integrate into UnitDetailPage
  - [ ] "Current Residents" section
  - [ ] "Assign Resident" button
  - [ ] Resident history

### Week 3 Validation

- [ ] Units CRUD complete
- [ ] Resident assignment works
- [ ] Resident history is saved
- [ ] UI shows relationships correctly
- [ ] Business validations (no duplicate assignments)

---

# 📅 WEEK 4: Booking System

**Goal:** Functional calendar-based booking system for common areas.

## Days 1-3: Bookings Backend

### Backend

- [ ] Update Prisma schema
  - [ ] Create `Booking` model
    - [ ] Fields: id, commonAreaId, userId, date, startTime, endTime, status, notes, createdAt
  - [ ] Create `BookingStatus` enum (PENDING, CONFIRMED, CANCELLED, COMPLETED)
  - [ ] Add relations
  - [ ] Run migration

- [ ] Create Bookings module
  - [ ] Generate resource
  - [ ] Setup module, service, controller

- [ ] Implement business logic
  - [ ] Validate no overlapping bookings
  - [ ] Validate allowed time slots
  - [ ] Validate minimum advance booking time
  - [ ] User limits (e.g., max 2 active bookings)

- [ ] Implement Bookings Service
  - [ ] `findAll()` with filters (userId, commonAreaId, date)
  - [ ] `findOne(id)`
  - [ ] `create(dto)` with business validations
  - [ ] `updateStatus(id, status)` - change booking status
  - [ ] `cancel(id)` - cancel booking
  - [ ] `getAvailableSlots(commonAreaId, date)` - return available time slots

- [ ] Implement Bookings Controller
  - [ ] `GET /bookings` - list with filters
  - [ ] `GET /bookings/:id` - detail
  - [ ] `POST /bookings` - create new booking
  - [ ] `PATCH /bookings/:id/status` - approve/reject (admin/manager)
  - [ ] `DELETE /bookings/:id` - cancel
  - [ ] `GET /bookings/available-slots` - get available slots

- [ ] Create seeders with test data
  - [ ] 1 admin user (without password for now)
  - [ ] 3 sample buildings
  - [ ] 10 units per building
  - [ ] 5 common areas per building
  - [ ] Run seed script

### Backend Validation

- [ ] Doesn't allow overlapping bookings
- [ ] Validates time slots
- [ ] Booking states work correctly

---

## Days 4-5: Bookings Frontend

### Frontend

- [ ] Create `features/bookings/` structure
  - [ ] Types, services, hooks

- [ ] Create Components
  - [ ] `BookingCalendar.tsx` - calendar with Mantine DatePicker
    - [ ] Monthly view
    - [ ] Availability indicators
    - [ ] Click on date opens modal
  - [ ] `BookingForm.tsx` - booking form
    - [ ] Common area selector
    - [ ] Date and time pickers
    - [ ] Real-time validations
    - [ ] Notes field
  - [ ] `BookingCard.tsx` - booking card
  - [ ] `BookingsList.tsx` - bookings list
  - [ ] `BookingStatusBadge.tsx` - status badge

- [ ] Create Pages
  - [ ] `BookingsPage.tsx` (for residents)
    - [ ] Availability calendar
    - [ ] My bookings section
    - [ ] Create new booking button
  - [ ] `BookingsManagementPage.tsx` (for admin/manager)
    - [ ] All bookings list
    - [ ] Filters by status/area/date
    - [ ] Approve/reject buttons

- [ ] Additional Features
  - [ ] Auto-refresh calendar every 30 seconds
  - [ ] Real-time validations
  - [ ] Confirmation before cancel
  - [ ] Success/error notifications

### Week 4 Validation

- [ ] Calendar shows correct availability
- [ ] Residents can create bookings
- [ ] Admins can approve/reject
- [ ] No overlapping bookings allowed
- [ ] UI is responsive and smooth

---

# 📅 WEEK 5: Staff and Tickets Management

**Goal:** Staff management and tickets/incidents system.

## Days 1-2: Staff Module

### Backend

- [ ] Create Staff module (using existing Staff model)
  - [ ] Generate resource
  - [ ] Setup module, service, controller

- [ ] Implement DTOs
  - [ ] `CreateStaffDto` (userId, buildingId, role, startDate)
  - [ ] `UpdateStaffDto`

- [ ] Implement Staff Service
  - [ ] `findAll()` with buildingId filter
  - [ ] `findOne(id)`
  - [ ] `create(dto)` - assign staff to building
  - [ ] `update(id, dto)`
  - [ ] `remove(id)` - soft delete

- [ ] Implement Staff Controller
  - [ ] Standard CRUD endpoints
  - [ ] `GET /staff?buildingId=xxx` - filter by building

### Frontend

- [ ] Create `features/staff/` structure
  - [ ] Types, services, hooks

- [ ] Create Components
  - [ ] `StaffCard.tsx` - staff member card
  - [ ] `StaffForm.tsx` - form modal
  - [ ] `StaffList.tsx` - staff list

- [ ] Integrate into BuildingDetailPage
  - [ ] "Staff" tab
  - [ ] List assigned staff
  - [ ] Add/edit/remove staff

---

## Days 3-5: Tickets System

### Backend

- [ ] Update Prisma schema
  - [ ] Create `Ticket` model
    - [ ] Fields: id, buildingId, unitId (nullable), reportedBy (userId), assignedTo (staffId nullable), title, description, priority, status, createdAt, updatedAt, resolvedAt
  - [ ] Create `TicketComment` model
    - [ ] Fields: id, ticketId, userId, content, createdAt
  - [ ] Create `TicketPriority` enum (LOW, MEDIUM, HIGH, URGENT)
  - [ ] Create `TicketStatus` enum (OPEN, IN_PROGRESS, RESOLVED, CLOSED)
  - [ ] Run migration

- [ ] Create Tickets module
  - [ ] Generate resource
  - [ ] Setup module, service, controller

- [ ] Implement Tickets Service
  - [ ] `findAll()` with multiple filters
  - [ ] `findOne(id)` including comments
  - [ ] `create(dto)` - create ticket
  - [ ] `update(id, dto)`
  - [ ] `updateStatus(id, status)` - change status
  - [ ] `assignToStaff(id, staffId)` - assign ticket
  - [ ] `addComment(ticketId, userId, content)` - add comment
  - [ ] `getTicketsByBuilding(buildingId)` - filter by building

- [ ] Implement Tickets Controller
  - [ ] `GET /tickets` - list with filters
  - [ ] `GET /tickets/:id` - detail with comments
  - [ ] `POST /tickets` - create (any authenticated user)
  - [ ] `PATCH /tickets/:id` - update
  - [ ] `PATCH /tickets/:id/status` - change status
  - [ ] `PATCH /tickets/:id/assign` - assign to staff
  - [ ] `POST /tickets/:id/comments` - add comment

### Frontend

- [ ] Create `features/tickets/` structure
  - [ ] Types, services, hooks

- [ ] Create Components
  - [ ] `TicketCard.tsx` - ticket card
  - [ ] `TicketForm.tsx` - create ticket form
  - [ ] `TicketDetail.tsx` - detail view
  - [ ] `TicketComments.tsx` - comments section
  - [ ] `CommentForm.tsx` - add comment form
  - [ ] `TicketFilters.tsx` - filters component
  - [ ] `TicketStatusBadge.tsx` - status badge
  - [ ] `TicketPriorityBadge.tsx` - priority badge

- [ ] Create Pages
  - [ ] `TicketsPage.tsx` (for residents)
    - [ ] My tickets
    - [ ] Create new ticket button
  - [ ] `TicketsManagementPage.tsx` (for admin/manager/staff)
    - [ ] All tickets list
    - [ ] Advanced filters
    - [ ] Assign tickets
    - [ ] Change status
  - [ ] `TicketDetailPage.tsx`
    - [ ] Complete ticket info
    - [ ] Comments thread
    - [ ] Actions based on role

### Week 5 Validation

- [ ] Staff CRUD works
- [ ] Tickets system operational
- [ ] Ticket assignment to staff works
- [ ] Comments work correctly
- [ ] Status changes are logged
- [ ] Multiple filters work

---

# 📅 WEEK 6: Authentication and Authorization

**Goal:** Complete authentication system with role-based access control.

## Days 1-3: Backend Authentication

### Backend

- [ ] Create Auth module
  - [ ] Generate module, service, controller
  - [ ] Install JWT and Passport dependencies

- [ ] Implement registration
  - [ ] `POST /auth/register` endpoint
  - [ ] Data validation with class-validator
  - [ ] Password hashing with bcrypt
  - [ ] Create user in database
  - [ ] Return user data (without password)

- [ ] Implement login
  - [ ] `POST /auth/login` endpoint
  - [ ] Validate credentials
  - [ ] Compare hashed password
  - [ ] Generate JWT token
  - [ ] Return user + access_token

- [ ] Implement JWT Strategy
  - [ ] Create JwtStrategy class
  - [ ] Configure JWT verification
  - [ ] Extract user from token
  - [ ] Create JwtAuthGuard

- [ ] Implement Role-Based Guards
  - [ ] Create `@Roles()` decorator
  - [ ] Create RolesGuard
  - [ ] Validate user roles from token

- [ ] Protect existing endpoints
  - [ ] Add `@UseGuards(JwtAuthGuard)` to controllers
  - [ ] Add `@Roles()` decorator where needed
  - [ ] Buildings: ADMIN, MANAGER can create/edit/delete
  - [ ] Bookings: RESIDENT can create, ADMIN/MANAGER can approve
  - [ ] Tickets: Any authenticated user can create
  - [ ] Staff: ADMIN only

### Backend Validation

- [ ] Register creates user correctly
- [ ] Login returns valid JWT
- [ ] Protected routes require token
- [ ] Role-based access works
- [ ] Invalid tokens are rejected

---

## Days 4-5: Frontend Authentication

### Frontend

- [ ] Create `features/auth/` structure
  - [ ] `auth.types.ts` (User, LoginDto, RegisterDto, AuthResponse)
  - [ ] `auth.service.ts` (login, register, logout, getCurrentUser)
  - [ ] `useAuth.ts` (context hook)
  - [ ] `useLogin.ts` (login mutation)
  - [ ] `useRegister.ts` (register mutation)

- [ ] Implement AuthContext
  - [ ] State: user, token, isAuthenticated, isLoading
  - [ ] Actions: login, logout, checkAuth
  - [ ] Store token in localStorage
  - [ ] Restore session on app load

- [ ] Update Axios configuration
  - [ ] Request interceptor to add Authorization header
  - [ ] Response interceptor to handle 401 errors
  - [ ] Redirect to login on unauthorized

- [ ] Create Auth Components
  - [ ] `LoginForm.tsx`
    - [ ] Email and password fields
    - [ ] Validations
    - [ ] Submit handling
    - [ ] Link to register
  - [ ] `RegisterForm.tsx`
    - [ ] User info fields
    - [ ] Password confirmation
    - [ ] Submit handling
    - [ ] Link to login

- [ ] Create Auth Pages
  - [ ] `LoginPage.tsx` - login form layout
  - [ ] `RegisterPage.tsx` - register form layout

- [ ] Implement ProtectedRoute component
  - [ ] Check authentication state
  - [ ] Redirect to login if not authenticated
  - [ ] Check user roles if specified
  - [ ] Show unauthorized message if insufficient permissions

- [ ] Update Router configuration
  - [ ] `/login` - public route
  - [ ] `/register` - public route
  - [ ] All other routes wrapped in ProtectedRoute
  - [ ] Role-based route protection

- [ ] Add user menu to AppShell
  - [ ] User avatar/name display
  - [ ] Dropdown menu
  - [ ] Logout button
  - [ ] Profile link (placeholder)

### Frontend Validation

- [ ] User can register
- [ ] User can login
- [ ] JWT is stored in localStorage
- [ ] Token is sent with requests
- [ ] Protected routes redirect to login
- [ ] User menu shows current user
- [ ] Logout clears session

### Week 6 Validation

- [ ] Complete authentication flow works
- [ ] Role-based access control functional
- [ ] Token refresh/expiry handled
- [ ] All previous features still work with auth
- [ ] UI shows/hides features based on roles

---

# 📅 WEEK 7: Dashboard and Deployment V1

**Goal:** Dashboard with metrics and application deployed.

## Days 1-2: Dashboard with Metrics

### Backend

- [ ] Create Dashboard module
  - [ ] Generate module, controller, service

- [ ] Implement statistics service
  - [ ] `getGeneralStats()` - overall statistics
    - [ ] Total buildings, units, residents, staff
    - [ ] Active bookings, open tickets
  - [ ] `getBuildingStats(buildingId)` - building-specific stats
    - [ ] Occupancy rate
    - [ ] Active tickets
    - [ ] Bookings this month
  - [ ] `getTicketsStats()` - tickets statistics
    - [ ] By status, by priority
    - [ ] Average resolution time
    - [ ] Open vs closed ratio
  - [ ] `getBookingsStats()` - bookings statistics
    - [ ] Bookings per month
    - [ ] Most used areas
    - [ ] Usage trends
  - [ ] `getRecentActivity()` - recent activity feed
    - [ ] Latest tickets, bookings, changes

- [ ] Implement Dashboard controller
  - [ ] `GET /dashboard/stats` - general statistics
  - [ ] `GET /dashboard/buildings/:id/stats` - building stats
  - [ ] `GET /dashboard/recent-activity` - activity feed

### Frontend

- [ ] Create `features/dashboard/` structure
  - [ ] Types, services, hooks

- [ ] Create Dashboard Components
  - [ ] `StatsCard.tsx` - statistics card
    - [ ] Large number display
    - [ ] Icon
    - [ ] Optional trend indicator
  - [ ] `RecentActivityList.tsx` - activity feed
  - [ ] `TicketsChart.tsx` - tickets chart (pie or bar)
  - [ ] `BookingsChart.tsx` - bookings chart (line or bar)
  - [ ] `OccupancyChart.tsx` - building occupancy

- [ ] Create DashboardPage
  - [ ] `DashboardPage.tsx`
    - [ ] Grid of stat cards (4 main KPIs)
    - [ ] Charts section with Mantine Charts or Recharts
    - [ ] Recent activity feed
    - [ ] Role-based view (different for ADMIN vs RESIDENT)

### Validation

- [ ] Dashboard shows correct metrics
- [ ] Charts render properly
- [ ] Stats update on refetch
- [ ] Loading states work

---

## Days 3-5: First Deployment

### Backend Deployment Preparation

- [ ] Prepare for production
  - [ ] Configure CORS for production frontend URL
  - [ ] Setup environment variables validation
  - [ ] Install Helmet for security headers
  - [ ] Add rate limiting middleware
  - [ ] Create health check endpoint (`GET /health`)
  - [ ] Configure production logging

- [ ] Configure Railway/Render deployment
  - [ ] Create account on chosen platform
  - [ ] Create new project
  - [ ] Connect GitHub repository
  - [ ] Add PostgreSQL database addon
  - [ ] Configure environment variables:
    - [ ] DATABASE_URL (from postgres addon)
    - [ ] JWT_SECRET (generate strong secret)
    - [ ] NODE_ENV=production
    - [ ] CORS_ORIGIN (frontend URL)
  - [ ] Configure build settings
  - [ ] Configure start command

- [ ] Database deployment
  - [ ] Run migrations in production
  - [ ] Run seed script with production data
  - [ ] Verify database connection

### Frontend Deployment Preparation

- [ ] Prepare for production
  - [ ] Configure environment variables
    - [ ] `VITE_API_URL` pointing to production backend
  - [ ] Optimize build configuration
    - [ ] Configure lazy loading for routes
    - [ ] Setup code splitting
    - [ ] Optimize bundle size
  - [ ] Add meta tags for SEO
  - [ ] Configure PWA (optional)

- [ ] Deploy to Vercel
  - [ ] Create Vercel account
  - [ ] Connect GitHub repository
  - [ ] Configure environment variables
  - [ ] Configure build settings
  - [ ] Deploy

### Deployment Testing

- [ ] Smoke testing of main features
  - [ ] Login/Logout works
  - [ ] Buildings CRUD works
  - [ ] Create booking

## Incoming tasks

- [ ] Add error handling in buildings.service.ts
  - [ ] Create custom exception filters for Prisma errors
    - [ ] Handle `PrismaClientKnownRequestError` (P2002: unique constraint, P2003: foreign key, P2025: record not found)
    - [ ] Handle `PrismaClientValidationError` (invalid data types)
    - [ ] Transform Prisma errors to NestJS exceptions (ConflictException, BadRequestException, etc.)
  - [ ] Add error handling to `create()` method
    - [ ] Validate managerId exists before creating
    - [ ] Handle unique constraint violations (e.g., duplicate building name)
    - [ ] Handle foreign key violations
    - [ ] Replace console.log with proper logger
  - [ ] Add error handling to `findAll()` method
    - [ ] Wrap query in try-catch
    - [ ] Handle database connection errors
  - [ ] Add error handling to `findOne()` method
    - [ ] Validate ID format before query
    - [ ] Handle database errors
    - [ ] Keep existing NotFoundException for not found cases
  - [ ] Add error handling to `update()` method
    - [ ] Validate building exists before updating
    - [ ] Handle unique constraint violations
    - [ ] Handle foreign key violations
    - [ ] Handle not found cases with NotFoundException
  - [ ] Add error handling to `remove()` method
    - [ ] Validate building exists before soft delete
    - [ ] Fix validation logic (Prisma throws before returning null)
    - [ ] Handle database errors
  - [ ] Add error handling to `restore()` method
    - [ ] Validate building exists and is deleted before restoring
    - [ ] Fix validation logic
    - [ ] Handle database errors
  - [ ] Add descriptive error messages in Spanish for all exceptions
  - [ ] Add unit tests for error scenarios

- [ ] Create database seed
  - [ ] 1 admin user (without password for now)
  - [ ] 3 sample buildings
  - [ ] 10 units per building
  - [ ] 5 common areas per building
  - [ ] Run seed script

- [ ] `GET /buildings` - list with query params (page, limit, search)
