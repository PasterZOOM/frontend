import { ReactElement, ReactNode } from 'react'

import { FieldValues, FormProvider, useForm, UseFormProps, UseFormReturn } from 'react-hook-form'

type PropsType<T extends FieldValues> = UseFormProps<T> & {
  children: (methods: UseFormReturn<T>) => ReactNode
}

export const HookForm = <T extends FieldValues>({
  children,
  ...option
}: PropsType<T>): ReactElement => {
  const methods = useForm<T>(option)

  return (
    <FormProvider {...methods}>
      <form className="space-y-3">{children(methods)}</form>
    </FormProvider>
  )
}
