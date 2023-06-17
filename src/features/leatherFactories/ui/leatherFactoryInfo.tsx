import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { RemoveButton } from 'components/common/ui/buttons/removeButton'
import { EditableSpanInput } from 'components/common/ui/editable/editableSpanInput'
import { EditableSpanSelect } from 'components/common/ui/editable/editableSpanSelect'
import { PropertyWithUnderline } from 'components/common/ui/properties/propertyWithUnderline'
import { TableItem } from 'components/common/ui/tabel/tableItem'
import { PropertyPreviewWrapper } from 'components/common/wrappers/propertyPreviewWrapper'
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

  return (
    <div className={`${className ?? ''} flex w-full flex-col justify-between`}>
      <div>
        <div className="space-y-1">
          <PropertyWithUnderline title="Идентификационный номер:">
            {factory._id}
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Название фабрики:">
            <EditableSpanInput
              onChange={title => updateLeatherFactory({ _id: factory._id, params: { title } })}
            >
              {factory.title}
            </EditableSpanInput>
          </PropertyWithUnderline>

          <PropertyWithUnderline title="Страна:">
            <EditableSpanSelect
              title={t(countryValues[factory.country].title)}
              initialValue={factory.country}
              onChange={country => updateLeatherFactory({ _id: factory._id, params: { country } })}
            >
              {countriesArray().map(country => (
                <option key={country._id} value={country.value}>
                  {t(country.title)}
                </option>
              ))}
            </EditableSpanSelect>
          </PropertyWithUnderline>

          <PropertyPreviewWrapper title="Описание:" childrenClassName="ml-5">
            <EditableSpanInput
              onChange={description =>
                updateLeatherFactory({ _id: factory._id, params: { description } })
              }
            >
              {factory.description}
            </EditableSpanInput>
          </PropertyPreviewWrapper>
        </div>

        <PropertyPreviewWrapper title="Артикулы:" wrapperClassName="mt-1" childrenClassName="ml-5">
          {factory.articles.map(article => (
            <TableItem key={article._id} title={article.title}>
              {({ closeModal, isOpen }) => (
                <LeatherArticleModal closeModal={closeModal} isOpen={isOpen} id={article._id} />
              )}
            </TableItem>
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