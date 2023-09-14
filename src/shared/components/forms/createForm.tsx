import { FC, ReactNode } from 'react'

import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form'

import { HookForm } from '@/shared/components/forms/hookForm'
import { CreateButton } from '@/shared/ui/buttons/createButton'

type PropsType<T extends FieldValues> = UseFormProps<T> & {
  children: ReactNode
  confirmModalChildren: FC<{ values: T }>
  onSubmit: (methods: UseFormReturn<T>) => Promise<void>
}

export const CreateForm = <T extends FieldValues>({
  children,
  onSubmit,
  confirmModalChildren,
  ...options
}: PropsType<T>): ReactNode => {
  return (
    <HookForm {...options}>
      {methods => (
        <>
          {children}
          <CreateButton
            modalChildren={confirmModalChildren({ values: methods.getValues() })}
            onConfirm={() => onSubmit(methods)}
          />
        </>
      )}
    </HookForm>
  )
}
