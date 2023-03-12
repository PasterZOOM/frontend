import { FC } from 'react'

import { UpdateLeatherFactoryForm } from '@/components/common/forms/crm/updateLeatherFactoryForm'
import { Button } from '@/components/common/ui/buttons/button'
import { ConfirmDeleteModal } from '@/components/modals/confirmDeleteModal'
import { ModalOverlay } from '@/components/modals/overlay'
import { countriesName } from '@/constants/countries/countriesName'
import { useGetLeatherFactory } from '@/hooks/crm/leatherFactories/useGetLeatherFactory'
import { useRemoveLeatherFactory } from '@/hooks/crm/leatherFactories/useRemoveLeatherFactory'
import { useModal } from '@/hooks/useModal'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  factoryId: string
}

export const LeatherFactoryModal: FC<PropsType> = ({ isOpen, closeModal, factoryId }) => {
  const factory = useGetLeatherFactory(factoryId, isOpen)
  const removeFactory = useRemoveLeatherFactory()

  const {
    open: openConfirmDeleteModal,
    close: closeConfirmDeleteModal,
    isOpen: isOpenConfirmDeleteModal,
  } = useModal()

  const onConfirmDelete = async (): Promise<void> => {
    await removeFactory(factoryId)
    closeConfirmDeleteModal()
    closeModal()
  }

  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal}>
      <div className="relative max-w-[95%] cursor-default bg-white dark:bg-anthracite-gray">
        {factory && (
          <>
            <div className="flex justify-between gap-2 border-b border-anthracite-gray border-opacity-20 p-4 dark:border-white">
              <div className="text-xl">
                Информация о фабрике <b>{factory.name}</b>
              </div>
              <button type="button" onClick={closeModal} className="h-fit text-lg">
                закрыть
              </button>
            </div>

            <div className="flex gap-4 p-4">
              <UpdateLeatherFactoryForm factory={factory} className="w-full" />
              <div className="flex w-full flex-col justify-between">
                <div>
                  <div className="w-fit space-y-1">
                    <div className="flex items-end justify-between gap-10 border-b border-anthracite-gray border-opacity-20 dark:border-white">
                      <div>Идентификационный номер:</div>
                      <div>{factory._id}</div>
                    </div>
                    <div className="flex items-end justify-between gap-10 border-b border-anthracite-gray border-opacity-20 dark:border-white">
                      <div>Название фабрики:</div>
                      <div>{factory.name}</div>
                    </div>
                    <div className="flex items-end justify-between gap-10 border-b border-anthracite-gray border-opacity-20 dark:border-white">
                      <div>Страна:</div>
                      <div>{countriesName[factory.country]}</div>
                    </div>
                    <div>
                      <div>Описание:</div>
                      <div className="ml-5">{factory.description}</div>
                    </div>
                  </div>
                  <div className="mt-1">
                    <div>Артирулы:</div>
                    <div className="ml-5">
                      {factory.articles.map(article => {
                        return (
                          <div key={article._id} className="w-fit">
                            {article.name}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <Button variant="delete" onClick={openConfirmDeleteModal} className="mt-3">
                  удалить
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <ConfirmDeleteModal
        closeModal={closeConfirmDeleteModal}
        isOpen={isOpenConfirmDeleteModal}
        onConfirm={onConfirmDelete}
        info={
          <>
            Вместе с фабрикой <b>{factory?.name}</b> будут удалены все связаные с ней артикулы и их
            цвета
          </>
        }
      />
    </ModalOverlay>
  )
}
