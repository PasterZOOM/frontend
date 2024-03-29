import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { GeneralFilterType } from '@/shared/components/pages/catalog/filters/filters'
import { useChangeMultipleQueryParams } from '@/shared/lib/hooks/queryParams/useChangeMultipleQueryParams'

type PropsType = {
  filter: GeneralFilterType
}

export const ActiveFilterTag: FC<PropsType> = ({ filter }) => {
  const { t } = useTranslation('common')

  const { removeQueryParams } = useChangeMultipleQueryParams(filter.filterKey)

  return (
    <button
      key={filter._id}
      className="h-fit rounded-full border border-anthracite-gray px-2 dark:border-light-gray"
      type="button"
      onClick={() => removeQueryParams(filter.value)}
    >
      <div className="flex gap-1">
        {filter.component && <div>{filter.component}</div>}
        <div>{t(filter.title)}</div>
      </div>
    </button>
  )
}
