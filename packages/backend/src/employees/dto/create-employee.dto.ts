import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { EmployeeRole } from 'generated/prisma/client'

export class CreateEmployeeDto {
  @ApiProperty({
    example: 'John',
    description: 'Employee first name',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string

  @ApiProperty({
    example: 'Doe',
    description: 'Employee last name',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string

  @ApiProperty({
    example: '+51 987 654 321',
    description: 'Employee phone number',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Employee email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    example: EmployeeRole.MANAGER,
    description: 'Employee role',
    enum: EmployeeRole,
  })
  @IsEnum(EmployeeRole)
  role: EmployeeRole

  @ApiProperty({
    example: '2025-01-01',
    description: 'Employee start date',
  })
  @IsDate()
  @IsNotEmpty()
  startDate: Date

  @ApiProperty({
    example: '2025-01-01',
    description: 'Employee end date',
  })
  @IsDate()
  endDate: Date

  @ApiProperty({
    example: true,
    description: 'Employee is active',
  })
  @IsBoolean()
  isActive: boolean
}
