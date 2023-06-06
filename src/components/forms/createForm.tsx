import { ReactElement, ReactNode } from 'react'

import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'

import { CreateButton } from 'components/common/ui/buttons/createButton'

type PropsType<T extends FieldValues> = {
  methods: UseFormReturn<T>
  children: ReactNode
  onSubmit: SubmitHandler<T>
  confirmModalChildren: ReactNode
}

export const CreateForm = <T extends FieldValues>({
  methods,
  children,
  onSubmit,
  confirmModalChildren,
}: PropsType<T>): ReactElement => {
  return (
    <FormProvider {...methods}>
      <form className="space-y-3">
        {children}
        <CreateButton
          onConfirm={methods.handleSubmit(onSubmit)}
          modalChildren={confirmModalChildren}
        />
      </form>
    </FormProvider>
  )
}
