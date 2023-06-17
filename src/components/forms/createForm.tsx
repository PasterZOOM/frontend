import { FC, ReactNode } from 'react'

import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form'

import { CreateButton } from 'components/common/ui/buttons/createButton'
import { HookForm } from 'components/forms/hookForm'

type PropsType<T extends FieldValues> = {
  children: ReactNode
  onSubmit: (methods: UseFormReturn<T>) => Promise<void>
  confirmModalChildren: FC<{ values: T }>
} & UseFormProps<T>

export const CreateForm = <T extends FieldValues>({
  children,
  onSubmit,
  confirmModalChildren,
  defaultValues,
  resolver,
}: PropsType<T>): ReactNode => {
  return (
    <HookForm defaultValues={defaultValues} resolver={resolver}>
      {methods => (
        <>
          {children}
          <CreateButton
            onConfirm={() => onSubmit(methods)}
            modalChildren={confirmModalChildren({ values: methods.getValues() })}
          />
        </>
      )}
    </HookForm>
  )
}
