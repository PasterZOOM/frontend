import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { RemoveButton } from 'components/common/ui/buttons/removeButton'
import { EditableSpanInput } from 'components/common/ui/editable/editableSpanInput'
import { EditableSpanSelect } from 'components/common/ui/editable/editableSpanSelect'
import { PropertyInOneRow } from 'components/common/ui/properties/propertyInOneRow'
import { PropertyInOneRowWithEditableSpanInput } from 'components/common/ui/properties/propertyInOneRowWithEditableSpanInput'
import { TableItem } from 'components/common/ui/tabel/tableItem'
import { PropertyPreviewWrapper } from 'components/common/wrappers/propertyPreviewWrapper'
// eslint-disable-next-line import/no-cycle
import { LeatherArticleModal } from 'features/leatherArticles/modals/leatherArticleModal'
import { LeatherFactoryType } from 'features/leatherFactories/api/types'
import { useUpdateLeatherFactory } from 'features/leatherFactories/hooks/useUpdateLeatherFactory'
import { LeatherFactoryRemoveConfirmModalBody } from 'features/leatherFactories/modals/confirm/leatherFactoryRemoveConfirmModalBody'
import { countriesArray, countryValues } from 'objects/countries/countryValues'

type PropsType = {
  className?: string
  factory: LeatherFactoryType
  onDeleteConfirm: () => void
}

export const LeatherFactoryInfo: FC<PropsType> = ({ className, factory, onDeleteConfirm }) => {
  const { t } = useTranslation()
  const { mutate: updateLeatherFactory } = useUpdateLeatherFactory()

  const onChangeTitle = (title: string): void =>
    updateLeatherFactory({ _id: factory._id, params: { title } })

  return (
    <div className={`${className ?? ''} flex w-full flex-col justify-between`}>
      <div className="space-y-1">
        <PropertyInOneRow title="Идентификационный номер:">{factory._id}</PropertyInOneRow>

        <PropertyInOneRowWithEditableSpanInput title="Название фабрики:" onChange={onChangeTitle}>
          {factory.title}
        </PropertyInOneRowWithEditableSpanInput>

        <PropertyInOneRow title="Страна:">
          <EditableSpanSelect
            initialValue={factory.country}
            title={t(countryValues[factory.country].title)}
            onChange={country => updateLeatherFactory({ _id: factory._id, params: { country } })}
          >
            {countriesArray().map(country => (
              <option key={country._id} value={country.value}>
                {t(country.title)}
              </option>
            ))}
          </EditableSpanSelect>
        </PropertyInOneRow>

        <PropertyInOneRow title="Описание:">
          <EditableSpanInput
            className="ml-5"
            onChange={description =>
              updateLeatherFactory({ _id: factory._id, params: { description } })
            }
          >
            {factory.description}
          </EditableSpanInput>
        </PropertyInOneRow>

        <PropertyPreviewWrapper className="mt-1" title="Артикулы:">
          <div className="ml-5">
            {factory.articles.map(article => (
              <TableItem key={article._id} title={article.title}>
                {({ closeModal, isOpen }) => (
                  <LeatherArticleModal closeModal={closeModal} id={article._id} isOpen={isOpen} />
                )}
              </TableItem>
            ))}
          </div>
        </PropertyPreviewWrapper>
      </div>

      <RemoveButton
        className="mt-3"
        modalChildren={<LeatherFactoryRemoveConfirmModalBody factory={factory} />}
        onConfirm={onDeleteConfirm}
      />
    </div>
  )
}
