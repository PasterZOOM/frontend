import { FC } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { H5 } from 'components/common/ui/headers/h5'
import { CreateForm } from 'components/forms/createForm'
import { FormInputWithWrapper } from 'components/forms/inputs/formInputWithWrapper'
import { FormSelectWithWrapper } from 'components/forms/selects/formSelectWithWrapper'
import { ECountry } from 'enums/countries'
import { CreateLeatherFactoryFormType } from 'features/leatherFactories/forms/type'
import { resolver } from 'features/leatherFactories/forms/validation.sheme'
import { useCreateLeatherFactory } from 'features/leatherFactories/hooks/useCreateLeatherFactory'
import { LeatherFactoryCreatConfirmModalBody } from 'features/leatherFactories/modals/confirm/leatherFactoryCreatConfirmModalBody'
import { countriesArray } from 'objects/countries/countryValues'

const defaultValues: CreateLeatherFactoryFormType = {
  country: ECountry.ITALY,
  description: '',
  title: '',
}

export const CreateLeatherFactoryForm: FC = () => {
  const { mutateAsync: createFactory } = useCreateLeatherFactory()

  const methods = useForm<CreateLeatherFactoryFormType>({
    defaultValues,
    resolver,
  })
  const onSubmit: SubmitHandler<CreateLeatherFactoryFormType> = async (formData): Promise<void> => {
    try {
      await createFactory(formData)

      methods.reset()
    } catch (e) {
      /* empty */
    }
  }

  return (
    <>
      <H5 className="mb-4 font-bold">Создать фабрику</H5>
      <CreateForm
        methods={methods}
        onSubmit={onSubmit}
        confirmModalChildren={<LeatherFactoryCreatConfirmModalBody values={methods.getValues()} />}
      >
        <FormInputWithWrapper title="Название фабрики:" name="title" />

        <FormSelectWithWrapper
          title="Страна в которой расположена фабрика:"
          name="country"
          items={countriesArray()}
        />

        <FormInputWithWrapper title="Описание:" name="description" />
      </CreateForm>
    </>
  )
}
