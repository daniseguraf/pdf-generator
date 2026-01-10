import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrinterModule } from './printer/printer.module'
import { PrismaModule } from './prisma/prisma.module'
import { BuildingsModule } from './buildings/buildings.module'
import { AuthModule } from './auth/auth.module'
import { SeedModule } from './seed/seed.module'
import { CommonAreasModule } from './common-areas/common-areas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrinterModule,
    PrismaModule,
    BuildingsModule,
    AuthModule,
    SeedModule,
    CommonAreasModule,
  ],
})
export class AppModule {}
