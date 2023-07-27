import { FC, ReactNode } from 'react'

import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form'

import { CreateButton } from 'components/common/ui/buttons/createButton'
import { HookForm } from 'components/forms/hookForm'

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
