import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import { UseFormReturn } from 'react-hook-form'

import { CreateLeatherFactoryFormType } from 'features/leatherFactories/forms/module/type'
import { resolver } from 'features/leatherFactories/forms/module/validation.sheme'
import { LeatherFactoryCreatConfirmModalBody } from 'features/leatherFactories/forms/ui/leatherFactoryCreatConfirmModalBody'
import { useCreateLeatherFactory } from 'features/leatherFactories/hooks/useCreateLeatherFactory'
import { CreateForm } from 'shared/components/forms/createForm'
import { FormInputWithWrapper } from 'shared/components/forms/inputs/formInputWithWrapper'
import { FormSelectWithWrapper } from 'shared/components/forms/selects/formSelectWithWrapper'
import { ECountry } from 'shared/enums/country'
import { countriesArray } from 'shared/objects/countries/countryValues'
import { TypographyHeader } from 'shared/ui/typographyHeader/typographyHeader'

type FormValues = CreateLeatherFactoryFormType

const defaultValues: FormValues = {
  country: ECountry.ITALY,
  description: '',
  title: '',
}

export const CreateLeatherFactoryForm: FC = () => {
  const { mutateAsync: createFactory } = useCreateLeatherFactory()
  const { t } = useTranslation()

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
        {t('Создать фабрику')}
      </TypographyHeader>
      <CreateForm
        confirmModalChildren={LeatherFactoryCreatConfirmModalBody}
        defaultValues={defaultValues}
        resolver={resolver}
        onSubmit={onSubmit}
      >
        <FormInputWithWrapper<FormValues> label="Название фабрики:" name="title" />

        <FormSelectWithWrapper<FormValues>
          items={countriesArray}
          label="Страна в которой расположена фабрика:"
          name="country"
        />

        <FormInputWithWrapper<FormValues> label="Описание:" name="description" />
      </CreateForm>
    </>
  )
}
