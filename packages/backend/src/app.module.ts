import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrinterModule } from './printer/printer.module'
import { PrismaModule } from './prisma/prisma.module'
import { BuildingsModule } from './buildings/buildings.module'
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrinterModule,
    PrismaModule,
    BuildingsModule,
    EmployeesModule,
  ],
})
export class AppModule {}
