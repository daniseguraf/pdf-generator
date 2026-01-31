import { Alert } from '@mantine/core'
import { InfoIcon } from '@phosphor-icons/react'

export const NoElementsAvailable = ({ message }: { message: string }) => {
  return (
    <Alert icon={<InfoIcon size={20} />} color="blue" radius="md">
      {message}
    </Alert>
  )
}
