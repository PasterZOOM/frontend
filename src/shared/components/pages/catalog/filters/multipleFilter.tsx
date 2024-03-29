import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { EFilterKeys, GeneralFilterType } from '@/shared/components/pages/catalog/filters/filters'
import { useChangeMultipleQueryParams } from '@/shared/lib/hooks/queryParams/useChangeMultipleQueryParams'

type PropsType = {
  filterKey: EFilterKeys
  item: GeneralFilterType
}

export const MultipleFilter: FC<PropsType> = ({ filterKey, item }) => {
  const id = `checkbox_${item.value}`
  const { t } = useTranslation('common')

  const { setQueryParams, removeQueryParams, queryParam } = useChangeMultipleQueryParams(filterKey)

  const checked = [queryParam].flat().includes(item.value)

  return (
    <div className="flex gap-2">
      <input
        checked={checked}
        className="cursor-pointer"
        id={id}
        type="checkbox"
        onChange={e =>
          e.currentTarget.checked ? setQueryParams(item.value) : removeQueryParams(item.value)
        }
      />
      <label className="cursor-pointer" htmlFor={id}>
        {t(item.title)}
      </label>
    </div>
  )
}
