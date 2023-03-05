import { FC, useMemo, useRef } from 'react'

import { ELeatherColor } from '@/enums/materials'
import { useChangeMultipleQueryParams } from '@/hooks/useChangeMultipleQueryParams'
import { EFilterKeys, FilterType } from '@/mocks/filters'

type PropsType = {
  color: FilterType<ELeatherColor>
  filterKey: EFilterKeys
}

export const ColorFilterCheckbox: FC<PropsType> = ({ color, filterKey }) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null)

  const { setQueryParams, queryParams } = useChangeMultipleQueryParams(filterKey, color.value)

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
