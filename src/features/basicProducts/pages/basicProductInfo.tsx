import { FC } from 'react'

import { RemoveButton } from '@/components/common/ui/buttons/removeButton'
import { EditableSpanInput } from '@/components/common/ui/editable/editableSpanInput'
import { EditableSpanSelect } from '@/components/common/ui/editable/editableSpanSelect'
import { PropertyWithUnderline } from '@/components/common/ui/properties/propertyWithUnderline'
import { PropertyPreviewWrapper } from '@/components/common/wrappers/propertyPreviewWrapper'
import { SelectItemType } from '@/components/forms/formikSelect'
import { BasicProductType } from '@/features/basicProducts/api/types'
import { useUpdateBasicProduct } from '@/features/basicProducts/hooks/useUpdateBasicProduct'
import { BasicProductRemoveConfirmModalBody } from '@/features/basicProducts/modals/confirm/basicProductRemoveConfirmModalBody'
import { useGetAllLeatherArticles } from '@/features/leatherArticles/hooks/useGetAllLeatherArticles'
import { currencies, currencyArray } from '@/objects/currency/currency'
import { punchPatches, punchPatchesArray } from '@/objects/materials/punchPatch'
import { productAssignmentsArray } from '@/objects/products/productAssignments'
import { productCategories, productCategoriesArray } from '@/objects/products/productCategories'

type PropsType = {
  className?: string
  basicProduct: BasicProductType
  onDeleteConfirm: () => void
}

export const BasicProductInfo: FC<PropsType> = ({ className, basicProduct, onDeleteConfirm }) => {
  const articles: SelectItemType[] = useGetAllLeatherArticles().map(({ _id, title }) => ({
    _id,
    title,
    value: _id,
  }))

  const updateBasicProduct = useUpdateBasicProduct(basicProduct._id)

  return (
    <div className={`${className ?? ''} flex w-full flex-col justify-between`}>
      <div>
        <div className="space-y-1">
          <PropertyWithUnderline title="Идентификационный номер:">
            {basicProduct._id}
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Название изделия:">
            <EditableSpanInput onChange={title => updateBasicProduct({ title })}>
              {basicProduct.title}
            </EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Кожа:">
            <EditableSpanSelect
              title={basicProduct.leather.title}
              initialValue={basicProduct.leather._id}
              onChange={leather => updateBasicProduct({ leather })}
            >
              {articles.map(article => (
                <option key={article._id} value={article.value}>
                  {article.title}
                </option>
              ))}
            </EditableSpanSelect>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Стоимость:">
            <EditableSpanInput
              onChange={cost => updateBasicProduct({ cost: +cost })}
              inputProps={{ type: 'number' }}
            >
              {basicProduct.cost.toString()}
            </EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Валюта:">
            <EditableSpanSelect
              title={currencies[basicProduct.costCurrency].title}
              initialValue={basicProduct.costCurrency}
              onChange={costCurrency => updateBasicProduct({ costCurrency })}
            >
              {currencyArray.map(currency => (
                <option key={currency._id} value={currency.value}>
                  {currency.title}
                </option>
              ))}
            </EditableSpanSelect>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Категория:">
            <EditableSpanSelect
              title={productCategories[basicProduct.category].title}
              initialValue={basicProduct.category}
              onChange={category => updateBasicProduct({ category })}
            >
              {productCategoriesArray.map(category => (
                <option key={category._id} value={category.value}>
                  {category.title}
                </option>
              ))}
            </EditableSpanSelect>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Размер:">
            <EditableSpanInput onChange={size => updateBasicProduct({ size })}>
              {basicProduct.size}
            </EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Шаг пробойника:">
            <EditableSpanSelect
              title={punchPatches[basicProduct.punchPitch].title}
              initialValue={basicProduct.punchPitch}
              onChange={punchPitch => updateBasicProduct({ punchPitch })}
            >
              {punchPatchesArray.map(punchPitch => (
                <option key={punchPitch._id} value={punchPitch.value}>
                  {punchPitch.title}
                </option>
              ))}
            </EditableSpanSelect>
          </PropertyWithUnderline>

          <PropertyPreviewWrapper
            title="Назначения:"
            wrapperClassName="mt-1"
            childrenClassName="ml-5"
          >
            <EditableSpanSelect
              title={basicProduct.assignments.map(assignment => (
                <div key={assignment} className="w-fit">
                  {assignment}
                </div>
              ))}
              initialValue={basicProduct.assignments}
              onChange={assignments => updateBasicProduct({ assignments })}
              selectProps={{ multiple: true }}
            >
              {productAssignmentsArray.map(assignment => (
                <option key={assignment._id} value={assignment.value}>
                  {assignment.title}
                </option>
              ))}
            </EditableSpanSelect>
          </PropertyPreviewWrapper>
          <PropertyPreviewWrapper title="Описание:" childrenClassName="ml-5">
            <EditableSpanInput onChange={description => updateBasicProduct({ description })}>
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
