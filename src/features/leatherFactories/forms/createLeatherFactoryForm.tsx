import { FC } from 'react'

import { UseFormReturn } from 'react-hook-form'

import { TypographyHeader } from 'components/common/ui/typographyHeader/typographyHeader'
import { CreateForm } from 'components/forms/createForm'
import { FormInputWithWrapper } from 'components/forms/inputs/formInputWithWrapper'
import { FormSelectWithWrapper } from 'components/forms/selects/formSelectWithWrapper'
import { ECountry } from 'enums/country'
import { CreateLeatherFactoryFormType } from 'features/leatherFactories/forms/type'
import { resolver } from 'features/leatherFactories/forms/validation.sheme'
import { useCreateLeatherFactory } from 'features/leatherFactories/hooks/useCreateLeatherFactory'
import { LeatherFactoryCreatConfirmModalBody } from 'features/leatherFactories/modals/confirm/leatherFactoryCreatConfirmModalBody'
import { countriesArray } from 'objects/countries/countryValues'

type FormValues = CreateLeatherFactoryFormType

const defaultValues: FormValues = {
  country: ECountry.ITALY,
  description: '',
  title: '',
}

export const CreateLeatherFactoryForm: FC = () => {
  const { mutateAsync: createFactory } = useCreateLeatherFactory()

  const onSubmit = async (methods: UseFormReturn<FormValues>): Promise<void> => {
    await methods.handleSubmit(async (formData): Promise<void> => {
      try {
        await createFactory(formData)
        methods.reset()
      } catch (e) {
        /* empty */
      }
    })()
  }

  return (
    <>
      <TypographyHeader as="h5" className="mb-4 font-bold">
        Создать фабрику
      </TypographyHeader>
      <CreateForm
        confirmModalChildren={LeatherFactoryCreatConfirmModalBody}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resolver={resolver}
      >
        <FormInputWithWrapper<FormValues> title="Название фабрики:" name="title" />

        <FormSelectWithWrapper<FormValues>
          title="Страна в которой расположена фабрика:"
          name="country"
          items={countriesArray()}
        />

        <FormInputWithWrapper<FormValues> title="Описание:" name="description" />
      </CreateForm>
    </>
  )
}
