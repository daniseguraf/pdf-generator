import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateReservationDto } from './dto/create-reservation.dto'
import { UpdateReservationDto } from './dto/update-reservation.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ReservationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createReservationDto: CreateReservationDto, userId: number) {
    const { commonAreaId, attendees, startTime, endTime } = createReservationDto

    // Validate if the common area exists
    const commonArea = await this.prismaService.commonArea.findUnique({
      where: { id: commonAreaId },
    })

    if (!commonArea) {
      throw new NotFoundException('Common area not found')
    }

    console.log('createReservationDto', createReservationDto)
    console.log('commonArea', commonArea)
    console.log('--------------------')

    // Validate if the common area is available
    if (commonArea.deletedAt || !commonArea.isActive) {
      throw new NotFoundException('Common area is not available')
    }

    // Validate if the attendees number is greater than the capacity
    if (attendees > commonArea.capacity) {
      throw new BadRequestException(
        `Attendees number ${attendees} cannot be greater than capacity ${commonArea.capacity}`
      )
    }

    const endTimeMs = endTime.getTime()
    const startTimeMs = startTime.getTime()

    // validate if endTime is after startTime
    if (endTimeMs <= startTimeMs) {
      throw new BadRequestException(
        `Reservation end time cannot be before the start time `
      )
    }

    // Validate reservation duration
    const durationOfReservation = endTimeMs - startTimeMs
    const durationInHours = durationOfReservation / (1000 * 60 * 60)

    if (durationInHours > commonArea.maxHoursPerReservation) {
      throw new BadRequestException(
        `Reservation duration ${durationInHours} hours cannot be greater than maximum hours per reservation ${commonArea.maxHoursPerReservation}`
      )
    }

    // Validate if start time is after the common area open time
    const openTime = this.extractTimeString(commonArea.openTime)
    const closeTime = this.extractTimeString(commonArea.closeTime)
    const reservationStartHour = this.extractTimeString(startTime)
    const reservationEndHour = this.extractTimeString(endTime)
    console.log('openTime', openTime)
    console.log('closeTime', closeTime)
    console.log('reservationStartHour', reservationStartHour)
    console.log('reservationEndHour', reservationEndHour)

    if (reservationStartHour < openTime) {
      throw new BadRequestException(
        `Reservation start time ${reservationStartHour} cannot be before the common area open time ${openTime}`
      )
    }

    if (reservationEndHour > closeTime) {
      throw new BadRequestException(
        `Reservation end time ${reservationEndHour} cannot be after the common area close time ${closeTime}`
      )
    }

    return await this.prismaService.reservation.create({
      data: { ...createReservationDto, userId },
    })
  }

  async findAll() {
    return await this.prismaService.reservation.findMany({})
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`
  }

  /**
   * Extrae la hora en formato HH:MM:SS de un Date o string
   * @param date - Date object o string
   * @returns String en formato "HH:MM:SS"
   */
  private extractTimeString(date: Date | string): string {
    if (typeof date === 'string') {
      // Si es string, asumimos que ya está en formato de hora
      return date
    }

    // Si es Date, extraemos la hora en formato HH:MM:SS
    return date.toISOString().split('T')[1].split('.')[0]
  }
}
