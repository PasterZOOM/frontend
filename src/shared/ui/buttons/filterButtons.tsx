import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { useClearAllQueryParams } from 'shared/lib/hooks/queryParams/useClearAllQueryParams'
import { Button, ButtonVariant } from 'shared/ui/buttons/button'

interface FilterButtonsProps {
  closeFilters: () => void
  isOpen: boolean
  openFilters: () => void
}

export const FilterButtons: FC<FilterButtonsProps> = ({ isOpen, openFilters, closeFilters }) => {
  const clearAll = useClearAllQueryParams()
  const { t } = useTranslation()

  return (
    <div
      className={`sticky bottom-0 left-0 right-0 z-40 flex w-full gap-3 bg-white p-4 dark:bg-anthracite-gray md:p-6 xl:hidden ${
        isOpen ? '' : 'shadow-line-top dark:shadow-line-top-dark'
      }`}
    >
      {isOpen ? (
        <>
          <Button
            key="clearButton"
            className="w-full"
            variant={ButtonVariant.SECONDARY}
            onClick={clearAll}
          >
            {t('Очистить')}
          </Button>
          <Button key="applyButton" className="w-full" onClick={closeFilters}>
            {t('Применить')}
          </Button>
        </>
      ) : (
        <Button key="filtersButton" className="w-full" onClick={openFilters}>
          {t('Фильтра')}
        </Button>
      )}
    </div>
  )
}
