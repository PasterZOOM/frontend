import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { ActiveFilterTag } from 'shared/components/pages/catalog/filters/activeFilterTag'
import { useActiveFilters } from 'shared/components/pages/catalog/filters/useActiveFilters'
import { useClearAllQueryParams } from 'shared/lib/hooks/queryParams/useClearAllQueryParams'

type PropsType = {
  className?: string
}
const ActiveFilters: FC<PropsType> = ({ className = '' }) => {
  const { t } = useTranslation('catalog')

  const clearAll = useClearAllQueryParams()
  const { activeFilters } = useActiveFilters()

  return (
    <div className={`flex flex-wrap gap-2 ${className} ${activeFilters.length ? '' : 'hidden'}`}>
      {activeFilters.map(activeFilter => (
        <ActiveFilterTag key={activeFilter._id} filter={activeFilter} />
      ))}
      {activeFilters.length && (
        <button
          className="h-fit rounded-full border border-anthracite-gray px-2 dark:border-light-gray"
          type="button"
          onClick={clearAll}
        >
          {t('Clear all')}
        </button>
      )}
    </div>
  )
}

export default ActiveFilters
