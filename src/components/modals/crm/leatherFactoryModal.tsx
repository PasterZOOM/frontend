import { FC } from 'react'

import { useMutation, useQuery, useQueryClient } from 'react-query'

import { Button } from '@/components/common/ui/buttons/button'
import { ConfirmDeleteModal } from '@/components/modals/confirmDeleteModal'
import { ModalOverlay } from '@/components/modals/overlay'
import { queryKey } from '@/enums/crm/queryKey'
import { useModal } from '@/hooks/useModal'
import { useSrmServiceStore } from '@/store/crmServises'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  factoryId: string
}

export const LeatherFactoryModal: FC<PropsType> = ({ isOpen, closeModal, factoryId }) => {
  const leatherFactoryService = useSrmServiceStore(state => state.leatherFactoryService)

  const queryClient = useQueryClient()
  const { data: factory } = useQuery(`${queryKey.GET_FACTORY}-${factoryId}`, async () =>
    leatherFactoryService.getOne(factoryId)
  )
  const { mutateAsync: removeFactory } = useMutation(leatherFactoryService.remove, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKey.GET_ALL_FACTORIES])
      await queryClient.invalidateQueries([queryKey.GET_ALL_ARTICLES])
    },
  })

  const {
    open: openConfirmModal,
    close: closeConfirmModal,
    isOpen: isOpenConfirmModal,
  } = useModal()

  const onConfirm = async (): Promise<void> => {
    await removeFactory(factoryId)
    closeConfirmModal()
    closeModal()
  }

  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal}>
      <div className="relative h-[95%] w-[95%] bg-white dark:bg-anthracite-gray">
        <button type="button" onClick={closeModal} className="absolute top-4 right-4 z-10 text-lg">
          закрыть
        </button>
        <Button
          type="button"
          onClick={openConfirmModal}
          className="absolute bottom-4 right-4 z-10 bg-red-500 hover:bg-red-200"
        >
          удалить
        </Button>

        {factory && (
          <>
            <div>ID: {factory._id}</div>
            <div>Название фабрики: {factory.name}</div>
            <div>Страна: {factory.country}</div>
            <div>Описание: {factory.description}</div>
            <div>
              Артирулы:
              {factory.articles.map(article => {
                return <div key={article._id}>{article.name}</div>
              })}
            </div>
          </>
        )}
      </div>
      <ConfirmDeleteModal
        closeModal={closeConfirmModal}
        isOpen={isOpenConfirmModal}
        itemName={factory?.name}
        onConfirm={onConfirm}
      />
    </ModalOverlay>
  )
}
