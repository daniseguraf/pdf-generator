import { Module } from '@nestjs/common'
import { PrinterService } from './printer.service'

@Module({
  providers: [PrinterService],
})
export class PrinterModule {}
