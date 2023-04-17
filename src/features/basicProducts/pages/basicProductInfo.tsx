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
import { BasicProductInfoPhotoBlock } from '@/features/basicProducts/pages/basicProductInfoPhotoBlock'
import { useGetAllLeatherArticles } from '@/features/leatherArticles/hooks/useGetAllLeatherArticles'
import { currencies, currencyArray } from '@/objects/currency/currency'
import { punchPatches, punchPatchesArray } from '@/objects/materials/punchPatch'
import { productAssignmentsArray } from '@/objects/products/productAssignments'
import { productCategories, productCategoriesArray } from '@/objects/products/productCategories'

type PropsType = {
  className?: string
  product: BasicProductType
  onDeleteConfirm: () => void
}

export const BasicProductInfo: FC<PropsType> = ({ className, product, onDeleteConfirm }) => {
  const { data } = useGetAllLeatherArticles()
  const { mutate: updateBasicProduct } = useUpdateBasicProduct()

  const articles: SelectItemType[] = (data ?? []).map(({ _id, title }) => ({
    _id,
    title,
    value: _id,
  }))

  return (
    <div className={`${className ?? ''} flex w-full flex-col justify-between`}>
      <div>
        <div className="space-y-1">
          <PropertyWithUnderline title="Идентификационный номер:">
            {product._id}
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Название изделия:">
            <EditableSpanInput
              onChange={title => updateBasicProduct({ _id: product._id, params: { title } })}
            >
              {product.title}
            </EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Кожа:">
            <EditableSpanSelect
              title={product.leather.title}
              initialValue={product.leather._id}
              onChange={leather => updateBasicProduct({ _id: product._id, params: { leather } })}
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
              onChange={cost => updateBasicProduct({ _id: product._id, params: { cost: +cost } })}
              inputProps={{ type: 'number' }}
            >
              {product.cost.toString()}
            </EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Валюта:">
            <EditableSpanSelect
              title={currencies[product.costCurrency].title}
              initialValue={product.costCurrency}
              onChange={costCurrency =>
                updateBasicProduct({ _id: product._id, params: { costCurrency } })
              }
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
              title={productCategories[product.category].title}
              initialValue={product.category}
              onChange={category => updateBasicProduct({ _id: product._id, params: { category } })}
            >
              {productCategoriesArray.map(category => (
                <option key={category._id} value={category.value}>
                  {category.title}
                </option>
              ))}
            </EditableSpanSelect>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Размер:">
            <EditableSpanInput
              onChange={size => updateBasicProduct({ _id: product._id, params: { size } })}
            >
              {product.size}
            </EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Шаг пробойника:">
            <EditableSpanSelect
              title={punchPatches[product.punchPitch].title}
              initialValue={product.punchPitch}
              onChange={punchPitch =>
                updateBasicProduct({ _id: product._id, params: { punchPitch } })
              }
            >
              {punchPatchesArray.map(punchPitch => (
                <option key={punchPitch._id} value={punchPitch.value}>
                  {punchPitch.title}
                </option>
              ))}
            </EditableSpanSelect>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Опубликовано:">
            <input
              type="checkbox"
              checked={product.isPublished}
              onChange={({ currentTarget }) =>
                updateBasicProduct({
                  _id: product._id,
                  params: { isPublished: currentTarget.checked },
                })
              }
            />
          </PropertyWithUnderline>

          <PropertyPreviewWrapper
            title="Назначения:"
            wrapperClassName="mt-1"
            childrenClassName="ml-5"
          >
            <EditableSpanSelect
              title={product.assignments.map(assignment => (
                <div key={assignment} className="w-fit">
                  {assignment}
                </div>
              ))}
              initialValue={product.assignments}
              onChange={assignments =>
                updateBasicProduct({ _id: product._id, params: { assignments } })
              }
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
            <EditableSpanInput
              onChange={description =>
                updateBasicProduct({ _id: product._id, params: { description } })
              }
            >
              {product.description}
            </EditableSpanInput>
          </PropertyPreviewWrapper>

          <BasicProductInfoPhotoBlock product={product} />
        </div>
      </div>
      <RemoveButton
        onConfirm={onDeleteConfirm}
        className="mt-3"
        modalChildren={<BasicProductRemoveConfirmModalBody basicProduct={product} />}
      />
    </div>
  )
}
