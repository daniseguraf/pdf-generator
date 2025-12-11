import { Injectable } from '@nestjs/common'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class EmployeesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const response = await this.prismaService.employee.create({
        data: createEmployeeDto,
      })

      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  findAll() {
    return `This action returns all employees`
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`
  }

  remove(id: number) {
    return `This action removes a #${id} employee`
  }
}
