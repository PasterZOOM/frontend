import { FC } from 'react'

import { EFilterKeys, GeneralFilterType } from 'components/pages/catalog/filters/filters'
import { useChangeMultipleQueryParams } from 'hooks/queryParams/useChangeMultipleQueryParams'

type PropsType = {
  filterKey: EFilterKeys
  item: GeneralFilterType
}

export const MultipleFilter: FC<PropsType> = ({ filterKey, item }) => {
  const id = `checkbox_${item.value}`

  const { setQueryParams, queryParams } = useChangeMultipleQueryParams(filterKey, item.value)

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
