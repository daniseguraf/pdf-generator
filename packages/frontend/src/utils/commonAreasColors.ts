import { CommonAreasValues, type CommonAreas } from '@my-buildings/shared/index'

export const getCommonAreaColor = (type: CommonAreas) => {
  const colors = {
    [CommonAreasValues.GYM]: '#00FF00',
    [CommonAreasValues.POOL]: '#0000FF',
    [CommonAreasValues.GRILL_AREA]: '#FF0000',
    [CommonAreasValues.CAFETERIA]: '#00FFFF',
    [CommonAreasValues.EVENT_ROOM]: '#FF00FF',
    [CommonAreasValues.ROOF_TOP]: '#FFFF00',
    [CommonAreasValues.COWORKING]: '#000000',
  }

  return colors[type] || '#e9ecef'
}
