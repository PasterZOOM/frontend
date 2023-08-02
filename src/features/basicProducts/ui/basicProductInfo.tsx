import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { PropertyPreviewWrapper } from 'components/common/wrappers/propertyPreviewWrapper'
import { BasicProductType } from 'features/basicProducts/api/types'
import { useUpdateBasicProduct } from 'features/basicProducts/hooks/useUpdateBasicProduct'
import { BasicProductRemoveConfirmModalBody } from 'features/basicProducts/modals/confirm/basicProductRemoveConfirmModalBody'
import { BasicProductInfoPhotoBlock } from 'features/basicProducts/ui/basicProductInfoPhotoBlock'
import { useGetAllLeatherArticles } from 'features/leatherArticles/hooks/useGetAllLeatherArticles'
import { currencies, currencyArray } from 'objects/currency/currency'
import { punchPatches, punchPatchesArray } from 'objects/materials/punchPatch'
import { productAssignmentsArray } from 'objects/products/productAssignments'
import { productCategories, productCategoriesArray } from 'objects/products/productCategories'
import { RemoveButton } from 'shared/ui/buttons/removeButton'
import { EditableSpanInput } from 'shared/ui/editable/editableSpanInput'
import { EditableSpanSelect } from 'shared/ui/editable/editableSpanSelect'
import { PropertyInOneRow } from 'shared/ui/properties/propertyInOneRow'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'

type PropsType = {
  className?: string
  onDeleteConfirm: () => void
  product: BasicProductType
}

export const BasicProductInfo: FC<PropsType> = ({ className, product, onDeleteConfirm }) => {
  const { t } = useTranslation()
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
          <PropertyInOneRow title="Идентификационный номер:">{product._id}</PropertyInOneRow>

          <PropertyInOneRow title="Название изделия:">
            <EditableSpanInput
              onChange={title => updateBasicProduct({ _id: product._id, params: { title } })}
            >
              {product.title}
            </EditableSpanInput>
          </PropertyInOneRow>

          <PropertyInOneRow title="Кожа:">
            <EditableSpanSelect
              initialValue={product.leather._id}
              title={product.leather.title}
              onChange={leather => updateBasicProduct({ _id: product._id, params: { leather } })}
            >
              {articles.map(article => (
                <option key={article._id} value={article.value}>
                  {article.title}
                </option>
              ))}
            </EditableSpanSelect>
          </PropertyInOneRow>

          <PropertyInOneRow title="Стоимость:">
            <EditableSpanInput
              inputProps={{ type: 'number' }}
              onChange={cost => updateBasicProduct({ _id: product._id, params: { cost: +cost } })}
            >
              {product.cost.toString()}
            </EditableSpanInput>
          </PropertyInOneRow>

          <PropertyInOneRow title="Валюта:">
            <EditableSpanSelect
              initialValue={product.costCurrency}
              title={t(currencies[product.costCurrency].title)}
              onChange={costCurrency =>
                updateBasicProduct({ _id: product._id, params: { costCurrency } })
              }
            >
              {currencyArray().map(currency => (
                <option key={currency._id} value={currency.value}>
                  {t(currency.title)}
                </option>
              ))}
            </EditableSpanSelect>
          </PropertyInOneRow>

          <PropertyInOneRow title="Категория:">
            <EditableSpanSelect
              initialValue={product.category}
              title={t(productCategories[product.category].title)}
              onChange={category => updateBasicProduct({ _id: product._id, params: { category } })}
            >
              {productCategoriesArray().map(category => (
                <option key={category._id} value={category.value}>
                  {t(category.title)}
                </option>
              ))}
            </EditableSpanSelect>
          </PropertyInOneRow>

          <PropertyInOneRow title="Размер:">
            <EditableSpanInput
              onChange={size => updateBasicProduct({ _id: product._id, params: { size } })}
            >
              {product.size}
            </EditableSpanInput>
          </PropertyInOneRow>

          <PropertyInOneRow title="Шаг пробойника:">
            <EditableSpanSelect
              initialValue={product.punchPitch}
              title={punchPatches[product.punchPitch].title}
              onChange={punchPitch =>
                updateBasicProduct({ _id: product._id, params: { punchPitch } })
              }
            >
              {punchPatchesArray().map(punchPitch => (
                <option key={punchPitch._id} value={punchPitch.value}>
                  {punchPitch.title}
                </option>
              ))}
            </EditableSpanSelect>
          </PropertyInOneRow>

          <PropertyInOneRow title="Опубликовано:">
            <input
              checked={product.isPublished}
              type="checkbox"
              onChange={({ currentTarget }) =>
                updateBasicProduct({
                  _id: product._id,
                  params: { isPublished: currentTarget.checked },
                })
              }
            />
          </PropertyInOneRow>

          <PropertyPreviewWrapper className="mt-1" title="Назначения:">
            <EditableSpanSelect
              className="ml-5"
              initialValue={product.assignments}
              selectProps={{ multiple: true }}
              title={product.assignments.map(assignment => (
                <div key={assignment} className="w-fit">
                  {t(assignment)}
                </div>
              ))}
              onChange={assignments =>
                updateBasicProduct({ _id: product._id, params: { assignments } })
              }
            >
              {productAssignmentsArray().map(assignment => (
                <option key={assignment._id} value={assignment.value}>
                  {t(assignment.title)}
                </option>
              ))}
            </EditableSpanSelect>
          </PropertyPreviewWrapper>

          <PropertyPreviewWrapper title="Описание:">
            <EditableSpanInput
              className="ml-5"
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
        className="mt-3"
        modalChildren={<BasicProductRemoveConfirmModalBody basicProduct={product} />}
        onConfirm={onDeleteConfirm}
      />
    </div>
  )
}
