import { FC } from 'react'

import { useChangeQueryParams } from '@/hooks/useChangeQueryParams'
import { GeneralFilterType } from '@/mocks/filters'
import { FiltersKeysType } from '@/store/useFilterStore'

type PropsType = {
  filterKey: FiltersKeysType
  item: GeneralFilterType
}

export const Filter: FC<PropsType> = ({ filterKey, item }) => {
  const id = `checkbox_${item.value}`

  const { setQueryParams, queryParams } = useChangeQueryParams(filterKey, item.value)

  return (
    <div className="flex gap-2">
      <input
        checked={queryParams}
        className="cursor-pointer"
        id={id}
        type="checkbox"
        onChange={setQueryParams}
      />
      <label className="cursor-pointer" htmlFor={id}>
        {item.title}
      </label>
    </div>
  )
}
