import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrinterModule } from './printer/printer.module'
import { PrismaModule } from './prisma/prisma.module'
import { BuildingsModule } from './buildings/buildings.module'
import { AuthModule } from './auth/auth.module'
import { SeedModule } from './seed/seed.module'
import { CommonAreasModule } from './common-areas/common-areas.module'
import { ReservationsModule } from './reservations/reservations.module'
import { envConfig } from 'src/config/env.config'
import { envSchema } from 'src/config/env.validation'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
      validationSchema: envSchema,
    }),
    PrinterModule,
    PrismaModule,
    BuildingsModule,
    AuthModule,
    SeedModule,
    CommonAreasModule,
    ReservationsModule,
  ],
})
export class AppModule {}
