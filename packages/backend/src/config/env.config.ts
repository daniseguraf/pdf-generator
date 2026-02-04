export const envConfig = () => ({
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT ? parseInt(process.env.PORT) : 3001,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  databasePort: process.env.DATABASE_PORT || 5432,
})
