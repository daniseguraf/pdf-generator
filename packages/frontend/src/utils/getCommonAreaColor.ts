import { CommonAreasValues, type CommonAreas } from '@my-buildings/shared/index'

export const getCommonAreaColor = (type: CommonAreas): string => {
  const colors = {
    [CommonAreasValues.GYM]: '#7950f2',
    [CommonAreasValues.POOL]: '#f03e3e',
    [CommonAreasValues.GRILL_AREA]: '#1971c2',
    [CommonAreasValues.CAFETERIA]: '#2f9e44',
    [CommonAreasValues.EVENT_ROOM]: '#f59f00',
    [CommonAreasValues.ROOF_TOP]: '#ae3ec9',
    [CommonAreasValues.COWORKING]: '#f27d00',
  }

  return colors[type] || '#000000'
}
