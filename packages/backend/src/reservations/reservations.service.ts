import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateReservationDto } from './dto/create-reservation.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { ReservationStatus, User } from 'generated/prisma/client'

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

  async findBuildingByResidentId(user: User) {
    const building = await this.prismaService.building.findUnique({
      where: { id: user.buildingId ?? undefined },

      select: {
        id: true,
        name: true,
        description: true,
        address: true,
        district: true,
        city: true,
        province: true,
        email: true,
        propertyType: true,
        isActive: true,
        commonAreas: {
          where: { deletedAt: null, isActive: true },
          select: {
            id: true,
            type: true,
            description: true,
            capacity: true,
            maxHoursPerReservation: true,
            openTime: true,
            closeTime: true,
            daysAvailable: true,
            reservations: {
              where: { deletedAt: null },
            },
          },
          orderBy: {
            id: 'desc',
          },
        },
      },
    })

    if (!building) {
      throw new NotFoundException('Building not found')
    }

    return building
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`
  }

  // TODO: Implement update reservation status
  // update(id: number, updateReservationDto: UpdateReservationDto) {
  //   return `This action updates a #${id} reservation`
  // }

  async remove(reservationId: number) {
    const reservation = await this.prismaService.reservation.findUnique({
      where: { id: reservationId },
    })

    if (!reservation) {
      throw new NotFoundException(
        `Reservation with id ${reservationId} not found`
      )
    }

    return await this.prismaService.reservation.update({
      where: { id: reservationId },
      data: { deletedAt: new Date(), status: ReservationStatus.CANCELLED },
    })
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
