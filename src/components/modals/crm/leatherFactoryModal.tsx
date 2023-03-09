import { FC } from 'react'

import { LeatherFactoryType } from '@/api/crm/leatherFactoryApi/types'
import { Button } from '@/components/common/ui/buttons/button'
import { ConfirmDeleteModal } from '@/components/modals/confirmDeleteModal'
import { ModalOverlay } from '@/components/modals/overlay'
import { useModal } from '@/hooks/useModal'
import { useSrmServiceStore } from '@/store/crmServises'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  factory: LeatherFactoryType
}

export const LeatherFactoryModal: FC<PropsType> = ({ isOpen, closeModal, factory }) => {
  const leatherFactoryService = useSrmServiceStore(state => state.leatherFactoryService)
  const {
    open: openConfirmModal,
    close: closeConfirmModal,
    isOpen: isOpenConfirmModal,
  } = useModal()

  const onConfirm = async (): Promise<void> => {
    await leatherFactoryService.remove(factory._id)
    closeConfirmModal()
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
      </div>
      <ConfirmDeleteModal
        closeModal={closeConfirmModal}
        isOpen={isOpenConfirmModal}
        itemName={factory.name}
        onConfirm={onConfirm}
      />
    </ModalOverlay>
  )
}
