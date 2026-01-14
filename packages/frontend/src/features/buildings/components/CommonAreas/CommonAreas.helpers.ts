import { CommonAreasValues } from '@my-buildings/shared/index'

import { DaysOfWeekValues } from '@my-buildings/shared/index'

export const commonAreaLabels = {
  [CommonAreasValues.GYM]: 'Gimnasio',
  [CommonAreasValues.POOL]: 'Piscina',
  [CommonAreasValues.GRILL_AREA]: 'Área de Parrillas',
  [CommonAreasValues.CAFETERIA]: 'Cafetería',
  [CommonAreasValues.EVENT_ROOM]: 'Salón de Eventos',
  [CommonAreasValues.ROOF_TOP]: 'Roof Top',
  [CommonAreasValues.COWORKING]: 'Coworking',
}

export const dayLabels = {
  [DaysOfWeekValues.MONDAY]: 'Lunes',
  [DaysOfWeekValues.TUESDAY]: 'Martes',
  [DaysOfWeekValues.WEDNESDAY]: 'Miércoles',
  [DaysOfWeekValues.THURSDAY]: 'Jueves',
  [DaysOfWeekValues.FRIDAY]: 'Viernes',
  [DaysOfWeekValues.SATURDAY]: 'Sábado',
  [DaysOfWeekValues.SUNDAY]: 'Domingo',
  [DaysOfWeekValues.ALL]: 'Todos',
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Activo':
      return 'green'
    case 'Mantenimiento':
      return 'yellow'
    case 'Inactivo':
      return 'red'
    default:
      return 'gray'
  }
}

export const getAreaIcon = (type: string) => {
  const icons: Record<string, string> = {
    [CommonAreasValues.GYM]: '🏋️',
    [CommonAreasValues.POOL]: '🏊',
    [CommonAreasValues.GRILL_AREA]: '🍖',
    [CommonAreasValues.CAFETERIA]: '☕',
    [CommonAreasValues.EVENT_ROOM]: '🎉',
    [CommonAreasValues.ROOF_TOP]: '🌆',
    [CommonAreasValues.COWORKING]: '💼',
  }
  return icons[type] || '📍'
}
