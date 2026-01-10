import { Module } from '@nestjs/common'
import { CommonAreasService } from './common-areas.service'
import { CommonAreasController } from './common-areas.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [CommonAreasController],
  providers: [CommonAreasService],
  imports: [PrismaModule, AuthModule],
})
export class CommonAreasModule {}
