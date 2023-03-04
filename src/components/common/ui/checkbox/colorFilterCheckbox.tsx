import { FC, useMemo, useRef } from 'react'

import { ELeatherColor, TLeatherColor } from '@/enums/materials'
import { useChangeQueryParams } from '@/hooks/useChangeQueryParams'
import { FilterType } from '@/mocks/filters'
import { FiltersKeysType } from '@/store/useFilterStore'

type PropsType = {
  color: FilterType<TLeatherColor>
  filterKey: FiltersKeysType
}

export const ColorFilterCheckbox: FC<PropsType> = ({ color, filterKey }) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null)

  const { setQueryParams, queryParams } = useChangeQueryParams(filterKey, color.value)

  const bg = useMemo(() => {
    switch (color.value) {
      case ELeatherColor.RED: {
        return 'bg-red-700'
      }
      case ELeatherColor.BLACK: {
        return 'bg-black'
      }
      case ELeatherColor.GREEN: {
        return 'bg-green-700'
      }
      case ELeatherColor.YELLOW: {
        return 'bg-yellow-500'
      }
      default: {
        return ''
      }
    }
  }, [color])

  return (
    <div
      className={` aspect-square h-6 rounded-full  border-anthracite-gray dark:border-white ${bg} ${
        queryParams ? 'border-4' : 'border'
      }`}
    >
      <input
        ref={checkboxRef}
        type="checkbox"
        checked={queryParams}
        onChange={setQueryParams}
        className="h-full w-full cursor-pointer opacity-0"
      />
    </div>
  )
}
