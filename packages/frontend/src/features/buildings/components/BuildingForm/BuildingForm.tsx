import {
  Button,
  Drawer,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useForm, type FormValidateInput } from '@mantine/form'
import type {
  BuildingFormProps,
  BuildingFormValues,
} from '../../types/building.types'
import { useEffect } from 'react'
import { PropertyTypeValues, type Building } from '@my-buildings/shared/index'
import { useCreateBuilding } from '@features/buildings/hooks/mutations/buildings/useCreateBuilding'
import {
  amenitiesOptions,
  buildingFormSchema,
} from '@features/buildings/components/BuildingForm/BuildingForm.helpers'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useUpdateBuilding } from '@features/buildings/hooks/mutations/buildings/useUpdateBuilding'

export const BuildingForm = ({
  opened,
  onClose,
  building,
  isEdit,
}: BuildingFormProps) => {
  const { mutate: createBuilding, isPending: isCreatePending } =
    useCreateBuilding()

  const {
    mutate: updateBuilding,
    isPending: isUpdatePending,
    reset: resetUpdateBuilding,
  } = useUpdateBuilding()

  const isFormDisabled = isCreatePending || isUpdatePending

  const {
    id,
    name,
    address,
    district,
    city,
    province,
    postalCode,
    propertyType,
    yearBuilt,
    floors,
    phoneNumber,
    email,
    description,
    amenities,
  } = (building as Building) ?? {}

  const initialValues = {
    name: name ?? '',
    address: address ?? '',
    district: district ?? '',
    city: city ?? '',
    province: province ?? '',
    postalCode: postalCode ?? undefined,
    propertyType: propertyType ?? PropertyTypeValues.RESIDENTIAL,
    yearBuilt: yearBuilt ?? undefined,
    floors: floors ?? undefined,
    phoneNumber: phoneNumber ?? undefined,
    email: email ?? undefined,
    description: description ?? undefined,
    amenities: amenities ?? [],
  }

  const form = useForm<BuildingFormValues>({
    validateInputOnBlur: true,
    initialValues,
    validate: zod4Resolver(
      buildingFormSchema
    ) as unknown as FormValidateInput<BuildingFormValues>,
  })

  const handleClose = () => {
    onClose()
    form.resetDirty()
    form.reset()
  }

  const handleSubmit = () => {
    const errors = form.validate()

    if (errors.hasErrors || !form.isDirty()) return

    if (isEdit) {
      handleEdit()
    } else {
      handleCreate()
    }
  }

  const handleCreate = () => {
    createBuilding(
      {
        ...form.values,
        yearBuilt: Number(form.values.yearBuilt),
        floors: Number(form.values.floors),
      },
      {
        onSuccess: () => {
          handleClose()
        },
      }
    )
  }

  const handleEdit = () => {
    const updatedInfo = {
      ...form.values,
      yearBuilt: Number(form.values.yearBuilt),
      floors: Number(form.values.floors),
    }

    updateBuilding(
      {
        id,
        updateBuildingDto: updatedInfo,
      },
      {
        onSuccess: () => {
          handleClose()
          resetUpdateBuilding()
        },
      }
    )
  }

  useEffect(() => {
    if (building) {
      form.setValues(initialValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [building])

  return (
    <Drawer
      opened={opened}
      onClose={handleClose}
      title={isEdit ? 'Edit Building' : 'Create New Building'}
      position="right"
      size="lg"
      padding="lg"
    >
      <Stack gap="md">
        <TextInput
          label="Building Name"
          placeholder="e.g. Residential Towers"
          required
          disabled={isFormDisabled}
          {...form.getInputProps('name')}
        />

        <TextInput
          label="Address"
          placeholder="e.g. 1223 Avenue of the Americas"
          required
          disabled={isFormDisabled}
          {...form.getInputProps('address')}
        />

        <Group grow>
          <TextInput
            label="District"
            placeholder="e.g. Downtown"
            required
            disabled={isFormDisabled}
            {...form.getInputProps('district')}
          />

          <TextInput
            label="City"
            placeholder="e.g. New York"
            required
            disabled={isFormDisabled}
            {...form.getInputProps('city')}
          />
        </Group>

        <Group grow>
          <TextInput
            label="Province"
            placeholder="e.g. New York"
            required
            disabled={isFormDisabled}
            {...form.getInputProps('province')}
          />

          <TextInput
            label="Postal Code"
            placeholder="e.g. 10001"
            disabled={isFormDisabled}
            {...form.getInputProps('postalCode')}
          />
        </Group>

        <Select
          label="Property Type"
          placeholder="Select type"
          required
          disabled={isFormDisabled}
          data={[
            { value: PropertyTypeValues.RESIDENTIAL, label: 'Residential' },
            { value: PropertyTypeValues.COMMERCIAL, label: 'Commercial' },
            { value: PropertyTypeValues.MIXED, label: 'Mixed' },
          ]}
          {...form.getInputProps('propertyType')}
        />

        <Group grow>
          <NumberInput
            label="Year Built"
            placeholder="e.g. 2020"
            required
            min={1800}
            max={new Date().getFullYear()}
            hideControls
            disabled={isFormDisabled}
            {...form.getInputProps('yearBuilt')}
          />

          <NumberInput
            label="Number of Floors"
            placeholder="e.g. 18"
            required
            min={1}
            max={200}
            hideControls
            disabled={isFormDisabled}
            {...form.getInputProps('floors')}
          />
        </Group>

        <Group grow>
          <TextInput
            label="Phone"
            placeholder="e.g. +1 212-555-1234"
            disabled={isFormDisabled}
            {...form.getInputProps('phoneNumber')}
          />

          <TextInput
            label="Email"
            placeholder="e.g. contact@residentialtowers.com"
            type="email"
            disabled={isFormDisabled}
            {...form.getInputProps('email')}
          />
        </Group>

        <MultiSelect
          label="Amenities"
          placeholder="Select amenities"
          data={amenitiesOptions}
          disabled={isFormDisabled}
          {...form.getInputProps('amenities')}
        />

        <Textarea
          label="Description"
          placeholder="Building description (optional)"
          rows={3}
          disabled={isFormDisabled}
          {...form.getInputProps('description')}
        />

        <Group justify="flex-end" mt="md">
          <Button
            variant="light"
            size="sm"
            onClick={handleClose}
            disabled={isFormDisabled}
          >
            Cancel
          </Button>

          <Button size="sm" onClick={handleSubmit} loading={isFormDisabled}>
            {isEdit ? 'Edit Building' : 'Create Building'}
          </Button>
        </Group>
      </Stack>
    </Drawer>
  )
}
