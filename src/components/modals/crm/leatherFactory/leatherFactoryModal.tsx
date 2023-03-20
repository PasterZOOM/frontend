import { FC } from 'react'

import { RemoveButton } from '@/components/common/ui/buttons/removeButton'
import { PropertyWithUnderline } from '@/components/common/ui/properties/propertyWithUnderline'
import { PropertyPreviewWrapper } from '@/components/common/wrappers/propertyPreviewWrapper'
import { UpdateLeatherFactoryForm } from '@/components/forms/crm/leatherFactory/updateLeatherFactoryForm'
import { LeatherFactoryRemoveConfirmModalBody } from '@/components/modals/crm/leatherFactory/confirm/leatherFactoryRemoveConfirmModalBody'
import { ModalLayout } from '@/components/modals/crm/modalLayout'
import { countriesName } from '@/constants/countries/countriesName'
import { useGetLeatherFactory } from '@/hooks/crm/leatherFactories/useGetLeatherFactory'
import { useRemoveLeatherFactory } from '@/hooks/crm/leatherFactories/useRemoveLeatherFactory'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  id: string
}

export const LeatherFactoryModal: FC<PropsType> = ({ isOpen, closeModal, id }) => {
  const factory = useGetLeatherFactory(id, isOpen)
  const removeFactory = useRemoveLeatherFactory()

  const onDeleteConfirm = async (): Promise<void> => {
    await removeFactory(id)
    closeModal()
  }

  return (
    <ModalLayout
      isOpen={isOpen}
      closeModal={closeModal}
      title={`Информация о фабрике ${factory && factory.name}`}
    >
      {factory && (
        <div className="flex gap-4 p-4">
          <UpdateLeatherFactoryForm factory={factory} />
          <div className="flex w-full flex-col justify-between">
            <div>
              <div className="w-fit space-y-1">
                <PropertyWithUnderline title="Идентификационный номер:">
                  {factory._id}
                </PropertyWithUnderline>

                <PropertyWithUnderline title="Название фабрики:">
                  {factory.name}
                </PropertyWithUnderline>

                <PropertyWithUnderline title="Страна:">
                  {countriesName[factory.country]}
                </PropertyWithUnderline>

                <PropertyPreviewWrapper title="Описание:" childrenClassName="ml-5">
                  {factory.description}
                </PropertyPreviewWrapper>
              </div>
              <PropertyPreviewWrapper
                title="Артикулы:"
                wrapperClassName="mt-1"
                childrenClassName="ml-5"
              >
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
        </div>
      )}
    </ModalLayout>
  )
}
