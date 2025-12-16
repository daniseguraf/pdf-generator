import { applyDecorators, Type } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'

export const ApiCreateOperation = (
  summary: string,
  entityName: string,
  type: Type<any>
) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 201,
      description: `The ${entityName} has been successfully created.`,
      type,
    }),
    ApiBadRequestResponse({ description: 'Bad Request' })
  )
}

export const ApiFindAllOperation = (
  summary: string,
  entityName: string,
  type: Type<any>
) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 200,
      description: `The ${entityName} has been successfully retrieved.`,
      type: [type],
    })
  )
}

export const ApiFindOneOperation = (
  summary: string,
  entityName: string,
  type: Type<any>
) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 200,
      description: `The ${entityName} has been successfully retrieved.`,
      type,
    }),
    ApiResponse({
      status: 404,
      description: `${entityName} not found.`,
    })
  )
}

export const ApiUpdateOperation = (
  summary: string,
  entityName: string,
  type: Type<any>
) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 200,
      description: `The ${entityName} has been successfully updated.`,
      type,
    }),
    ApiResponse({
      status: 404,
      description: `${entityName} not found.`,
    }),
    ApiBadRequestResponse({ description: 'Bad Request' })
  )
}

export const ApiDeleteOperation = (
  summary: string,
  entityName: string,
  type: Type<any>
) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 200,
      description: `The ${entityName} has been successfully deleted.`,
      type,
    }),
    ApiBadRequestResponse({ description: 'Bad Request' })
  )
}
