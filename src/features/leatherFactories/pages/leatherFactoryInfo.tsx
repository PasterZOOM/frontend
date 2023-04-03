import { FC } from 'react'

import { RemoveButton } from '@/components/common/ui/buttons/removeButton'
import { EditableSpanInput } from '@/components/common/ui/editable/editableSpanInput'
import { PropertyWithUnderline } from '@/components/common/ui/properties/propertyWithUnderline'
import { PropertyPreviewWrapper } from '@/components/common/wrappers/propertyPreviewWrapper'
import { LeatherFactoryType } from '@/features/leatherFactories/api/types'
import { useUpdateLeatherFactory } from '@/features/leatherFactories/hooks/useUpdateLeatherFactory'
import { LeatherFactoryRemoveConfirmModalBody } from '@/features/leatherFactories/modals/confirm/leatherFactoryRemoveConfirmModalBody'
import { countriesName } from '@/objects/countries/countriesName'

type PropsType = {
  className?: string
  factory: LeatherFactoryType
  onDeleteConfirm: () => void
}

export const LeatherFactoryInfo: FC<PropsType> = ({ className, factory, onDeleteConfirm }) => {
  const { updateLeatherFactoryTitle, updateLeatherFactoryDescription } = useUpdateLeatherFactory(
    factory._id
  )

  return (
    <div className={`${className ?? ''} flex w-full flex-col justify-between`}>
      <div>
        <div className="space-y-1">
          <PropertyWithUnderline title="Идентификационный номер:">
            {factory._id}
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Название фабрики:">
            <EditableSpanInput onChange={updateLeatherFactoryTitle}>
              {factory.title}
            </EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Страна:">
            {countriesName[factory.country]}
          </PropertyWithUnderline>

          <PropertyPreviewWrapper title="Описание:" childrenClassName="ml-5">
            <EditableSpanInput onChange={updateLeatherFactoryDescription}>
              {factory.description}
            </EditableSpanInput>
          </PropertyPreviewWrapper>
        </div>
        <PropertyPreviewWrapper title="Артикулы:" wrapperClassName="mt-1" childrenClassName="ml-5">
          {factory.articles.map(article => (
            <div key={article._id} className="w-fit">
              {article.title}
            </div>
          ))}
        </PropertyPreviewWrapper>
      </div>
      <RemoveButton
        onConfirm={onDeleteConfirm}
        className="mt-3"
        modalChildren={<LeatherFactoryRemoveConfirmModalBody factory={factory} />}
      />
    </div>
  )
}
