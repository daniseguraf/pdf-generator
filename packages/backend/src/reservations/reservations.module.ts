import { Module } from '@nestjs/common'
import { ReservationsService } from './reservations.service'
import { ReservationsController } from './reservations.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService],
  imports: [PrismaModule, AuthModule],
})
export class ReservationsModule {}
