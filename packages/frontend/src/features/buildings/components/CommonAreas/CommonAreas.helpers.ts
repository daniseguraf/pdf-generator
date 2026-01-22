import { CommonAreasValues, type CommonAreas } from '@my-buildings/shared/index'

import { DaysOfWeekValues } from '@my-buildings/shared/index'

export const getAreaLabel = (type: CommonAreas) => {
  const areaLabels: Record<CommonAreas, string> = {
    [CommonAreasValues.GYM]: 'Gimnasio',
    [CommonAreasValues.POOL]: 'Piscina',
    [CommonAreasValues.GRILL_AREA]: 'Área de Parrillas',
    [CommonAreasValues.CAFETERIA]: 'Cafetería',
    [CommonAreasValues.EVENT_ROOM]: 'Salón de Eventos',
    [CommonAreasValues.ROOF_TOP]: 'Roof Top',
    [CommonAreasValues.COWORKING]: 'Coworking',
  }

  return areaLabels[type] || '---'
}

export const dayLabels = {
  [DaysOfWeekValues.MONDAY]: 'Lunes',
  [DaysOfWeekValues.TUESDAY]: 'Martes',
  [DaysOfWeekValues.WEDNESDAY]: 'Miércoles',
  [DaysOfWeekValues.THURSDAY]: 'Jueves',
  [DaysOfWeekValues.FRIDAY]: 'Viernes',
  [DaysOfWeekValues.SATURDAY]: 'Sábado',
  [DaysOfWeekValues.SUNDAY]: 'Domingo',
}

export const getStatusColor = (status: boolean) => {
  return status ? 'green' : 'red'
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
