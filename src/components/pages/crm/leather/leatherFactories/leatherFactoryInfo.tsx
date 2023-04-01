import { FC } from 'react'

import { LeatherFactoryType } from '@/api/crm/leatherFactoriesApi/types'
import { RemoveButton } from '@/components/common/ui/buttons/removeButton'
import { EditableSpanInput } from '@/components/common/ui/editable/editableSpanInput'
import { PropertyWithUnderline } from '@/components/common/ui/properties/propertyWithUnderline'
import { PropertyPreviewWrapper } from '@/components/common/wrappers/propertyPreviewWrapper'
import { LeatherFactoryRemoveConfirmModalBody } from '@/components/modals/crm/leatherFactory/confirm/leatherFactoryRemoveConfirmModalBody'
import { countriesName } from '@/constants/countries/countriesName'
import { useUpdateLeatherFactory } from '@/hooks/crm/leatherFactories/useUpdateLeatherFactory'

type PropsType = {
  className?: string
  factory: LeatherFactoryType
  onDeleteConfirm: () => void
}

export const LeatherFactoryInfo: FC<PropsType> = ({ className, factory, onDeleteConfirm }) => {
  const { updateLeatherFactoryName, updateLeatherFactoryDescription } = useUpdateLeatherFactory(
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
            <EditableSpanInput onChange={updateLeatherFactoryName}>
              {factory.name}
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
              {article.name}
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
