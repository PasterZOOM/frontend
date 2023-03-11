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
  articleId: string
}

export const LeatherArticleModal: FC<PropsType> = ({ isOpen, closeModal, articleId }) => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)
  const {
    open: openConfirmModal,
    close: closeConfirmModal,
    isOpen: isOpenConfirmModal,
  } = useModal()

  const queryClient = useQueryClient()
  const { data: article } = useQuery([queryKey.GET_ARTICLE, articleId], async () =>
    leatherArticlesService.getOne(articleId)
  )
  const { mutateAsync: removeArticle } = useMutation(leatherArticlesService.remove, {
    onSuccess: async data => {
      await queryClient.invalidateQueries([queryKey.GET_ALL_ARTICLES])
      await queryClient.invalidateQueries(`${queryKey.GET_FACTORY}-${data.factory}`)
    },
  })
  const onConfirm = async (): Promise<void> => {
    await removeArticle(articleId)
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
      </div>
      <ConfirmDeleteModal
        closeModal={closeConfirmModal}
        isOpen={isOpenConfirmModal}
        itemName={article?.name}
        onConfirm={onConfirm}
      />
    </ModalOverlay>
  )
}
