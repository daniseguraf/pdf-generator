import { CommonAreasValues, type CommonAreas } from '@my-buildings/shared/index'

import { DaysOfWeekValues } from '@my-buildings/shared/index'

export const getAreaLabel = (type: CommonAreas) => {
  const areaLabels: Record<CommonAreas, string> = {
    [CommonAreasValues.GYM]: 'Gym',
    [CommonAreasValues.POOL]: 'Pool',
    [CommonAreasValues.GRILL_AREA]: 'Grill Area',
    [CommonAreasValues.CAFETERIA]: 'Cafeteria',
    [CommonAreasValues.EVENT_ROOM]: 'Event Room',
    [CommonAreasValues.ROOF_TOP]: 'Roof Top',
    [CommonAreasValues.COWORKING]: 'Coworking',
  }

  return areaLabels[type] || '---'
}

export const dayLabels = {
  [DaysOfWeekValues.MONDAY]: 'Monday',
  [DaysOfWeekValues.TUESDAY]: 'Tuesday',
  [DaysOfWeekValues.WEDNESDAY]: 'Wednesday',
  [DaysOfWeekValues.THURSDAY]: 'Thursday',
  [DaysOfWeekValues.FRIDAY]: 'Friday',
  [DaysOfWeekValues.SATURDAY]: 'Saturday',
  [DaysOfWeekValues.SUNDAY]: 'Sunday',
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
