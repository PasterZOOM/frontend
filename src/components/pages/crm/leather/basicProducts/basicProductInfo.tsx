import { FC } from 'react'

import { BasicProductType } from '@/api/crm/basicProductsApi/types'
import { RemoveButton } from '@/components/common/ui/buttons/removeButton'
import { EditableSpanInput } from '@/components/common/ui/editable/editableSpanInput'
import { PropertyWithUnderline } from '@/components/common/ui/properties/propertyWithUnderline'
import { PropertyPreviewWrapper } from '@/components/common/wrappers/propertyPreviewWrapper'
import { BasicProductRemoveConfirmModalBody } from '@/components/modals/crm/basicProducts/confirm/basicProductRemoveConfirmModalBody'
import { useUpdateBasicProduct } from '@/hooks/crm/basicProducts/useUpdateBasicProduct'

type PropsType = {
  className?: string
  basicProduct: BasicProductType
  onDeleteConfirm: () => void
}

export const BasicProductInfo: FC<PropsType> = ({ className, basicProduct, onDeleteConfirm }) => {
  const {
    updateBasicProductDescription,
    updateBasicProductName,
    updateBasicProductSize,
    updateBasicProductCost,
  } = useUpdateBasicProduct(basicProduct._id)

  return (
    <div className={`${className ?? ''} flex w-full flex-col justify-between`}>
      <div>
        <div className="space-y-1">
          <PropertyWithUnderline title="Идентификационный номер:">
            {basicProduct._id}
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Название изделия:">
            <EditableSpanInput onChange={updateBasicProductName}>
              {basicProduct.title}
            </EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Кожа:">
            {basicProduct.leather._id} {/* TODO: с бэка приходит только id */}
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Стоимость:">
            <EditableSpanInput onChange={updateBasicProductCost} inputProps={{ type: 'number' }}>
              {basicProduct.cost.toString()}
            </EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Валюта:">{basicProduct.costCurrency}</PropertyWithUnderline>

          <PropertyWithUnderline title="Категория:">{basicProduct.category}</PropertyWithUnderline>

          <PropertyWithUnderline title="Размер:">
            <EditableSpanInput onChange={updateBasicProductSize}>
              {basicProduct.size}
            </EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Шаг пробойника:">
            {basicProduct.punchPitch}
          </PropertyWithUnderline>

          <PropertyPreviewWrapper
            title="Назначения:"
            wrapperClassName="mt-1"
            childrenClassName="ml-5"
          >
            {basicProduct.assignments.map(assignment => (
              <div key={assignment} className="w-fit">
                {assignment}
              </div>
            ))}
          </PropertyPreviewWrapper>

          <PropertyPreviewWrapper title="Описание:" childrenClassName="ml-5">
            <EditableSpanInput onChange={updateBasicProductDescription}>
              {basicProduct.description}
            </EditableSpanInput>
          </PropertyPreviewWrapper>
        </div>
      </div>
      <RemoveButton
        onConfirm={onDeleteConfirm}
        className="mt-3"
        modalChildren={<BasicProductRemoveConfirmModalBody basicProduct={basicProduct} />}
      />
    </div>
  )
}
