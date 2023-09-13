import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { BasicProductType } from 'features/basicProducts/api/types'
import { useUpdateBasicProduct } from 'features/basicProducts/hooks/useUpdateBasicProduct'
import { BasicProductRemoveConfirmModalBody } from 'features/basicProducts/modals/confirm/basicProductRemoveConfirmModalBody'
import { BasicProductInfoPhotoBlock } from 'features/basicProducts/ui/basicProductInfoPhotoBlock'
import { LeatherArticleModal } from 'features/leatherArticles/modals/leatherArticleModal'
import { LeatherFactoryModal } from 'features/leatherFactories/modals/leatherFactoryModal'
import { PropertyPreviewWrapper } from 'shared/components/common/wrappers/propertyPreviewWrapper'
import { punchPatches, punchPatchesArray } from 'shared/objects/materials/punchPatch'
import { productAssignmentsArray } from 'shared/objects/products/productAssignments'
import {
  productCategories,
  productCategoriesArray,
} from 'shared/objects/products/productCategories'
import { RemoveButton } from 'shared/ui/buttons/removeButton'
import { EditableSpanInput } from 'shared/ui/editable/editableSpanInput'
import { EditableSpanSelect } from 'shared/ui/editable/editableSpanSelect'
import { PropertyInOneRow } from 'shared/ui/properties/propertyInOneRow'
import { TableItem } from 'shared/ui/tabel/tableItem'

type PropsType = {
  className?: string
  onDeleteConfirm: () => void
  product: BasicProductType
}

export const BasicProductInfo: FC<PropsType> = ({ className, product, onDeleteConfirm }) => {
  const { t } = useTranslation()
  const { mutate: updateBasicProduct } = useUpdateBasicProduct()

  return (
    <div className={`${className ?? ''} flex w-full flex-col justify-between`}>
      <div>
        <div className="space-y-1">
          <PropertyInOneRow title="Идентификационный номер:">{product._id}</PropertyInOneRow>

          <PropertyInOneRow title="Название изделия:">
            <EditableSpanInput
              onChange={title => updateBasicProduct({ _id: product._id, data: { title } })}
            >
              {product.title}
            </EditableSpanInput>
          </PropertyInOneRow>

          <PropertyInOneRow title="Фабрика кожи:">
            <TableItem title={product.leather.factory.title}>
              {({ closeModal, isOpen }) => (
                <LeatherFactoryModal
                  closeModal={closeModal}
                  id={product.leather.factory._id}
                  isOpen={isOpen}
                />
              )}
            </TableItem>
          </PropertyInOneRow>

          <PropertyInOneRow title="Артикул кожи:">
            <TableItem title={product.leather.article.title}>
              {({ closeModal, isOpen }) => (
                <LeatherArticleModal
                  closeModal={closeModal}
                  id={product.leather.article._id}
                  isOpen={isOpen}
                />
              )}
            </TableItem>
          </PropertyInOneRow>

          <PropertyInOneRow title="Стоимость:">
            <EditableSpanInput
              inputProps={{ type: 'number' }}
              onChange={cost => updateBasicProduct({ _id: product._id, data: { cost: +cost } })}
            >
              {product.cost.toString()}
            </EditableSpanInput>
          </PropertyInOneRow>

          <PropertyInOneRow title="Категория:">
            <EditableSpanSelect
              initialValue={product.category}
              title={t(productCategories[product.category].title)}
              onChange={category => updateBasicProduct({ _id: product._id, data: { category } })}
            >
              {productCategoriesArray.map(category => (
                <option key={category._id} value={category.value}>
                  {t(category.title)}
                </option>
              ))}
            </EditableSpanSelect>
          </PropertyInOneRow>

          <PropertyInOneRow title="Размер:">
            <EditableSpanInput
              onChange={size => updateBasicProduct({ _id: product._id, data: { size } })}
            >
              {product.size}
            </EditableSpanInput>
          </PropertyInOneRow>

          <PropertyInOneRow title="Шаг пробойника:">
            <EditableSpanSelect
              initialValue={product.punchPitch}
              title={punchPatches[product.punchPitch].title}
              onChange={punchPitch =>
                updateBasicProduct({ _id: product._id, data: { punchPitch } })
              }
            >
              {punchPatchesArray.map(punchPitch => (
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
                  data: { isPublished: currentTarget.checked },
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
                updateBasicProduct({ _id: product._id, data: { assignments } })
              }
            >
              {productAssignmentsArray.map(assignment => (
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
                updateBasicProduct({ _id: product._id, data: { description } })
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
