import { ReactElement, ReactNode } from 'react'

import { FieldValues, FormProvider, useForm, UseFormProps, UseFormReturn } from 'react-hook-form'

type PropsType<T extends FieldValues> = {
  children: (methods: UseFormReturn<T>) => ReactNode
} & UseFormProps<T>

export const HookForm = <T extends FieldValues>({
  children,
  ...option
}: PropsType<T>): ReactElement => {
  const methods = useForm(option)

  return (
    <FormProvider {...methods}>
      <form className="space-y-3">{children(methods)}</form>
    </FormProvider>
  )
}
