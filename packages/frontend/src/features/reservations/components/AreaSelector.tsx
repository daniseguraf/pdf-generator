import { CommonAreaCard } from '@components/CommonAreaCard/CommonAreaCard'
import { Text, SimpleGrid } from '@mantine/core'

interface AreaSelectorProps {
  areas: []
  selectedArea: string | null
  onSelectArea: (areaId: string) => void
}

export const AreaSelector = ({
  commonAreas = [],
  selectedArea,
  onSelectArea,
}: AreaSelectorProps) => {
  return (
    <div>
      <Text fw={600} size="lg" mb="md">
        Select a common area
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {commonAreas?.map(commonArea => {
          const isSelected = commonArea.id === selectedArea

          return (
            <CommonAreaCard
              key={commonArea.id}
              commonArea={commonArea}
              style={{
                cursor: 'pointer',
                border: isSelected
                  ? `2px solid ${commonArea.color}`
                  : '1px solid #e9ecef',
                backgroundColor: isSelected ? `${commonArea.color}10` : 'white',
                transition: 'all 0.2s ease',
              }}
              onClick={() => onSelectArea(commonArea.id)}
            />
          )
        })}
      </SimpleGrid>
    </div>
  )
}

// {isSelected && (
//                 <Badge
//                   size="sm"
//                   variant="filled"
//                   color={area.color}
//                   fullWidth
//                 >
//                   Selected area
//                 </Badge>
//               )}
