import { FC, useMemo, useRef } from 'react'

import { EFilterKeys, FilterType } from 'components/pages/catalog/filters/filters'
import { ELeatherColor } from 'enums/materials'
import { useChangeMultipleQueryParams } from 'hooks/queryParams/useChangeMultipleQueryParams'

type PropsType = {
  color: FilterType<EFilterKeys, ELeatherColor>
  filterKey: EFilterKeys
}

export const ColorFilterCheckbox: FC<PropsType> = ({ color, filterKey }) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null)

  const { setQueryParams, removeQueryParams, queryParams } = useChangeMultipleQueryParams(filterKey)
  const checked = queryParams?.includes(color.value)

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
  }, [color.value])

  return (
    <div
      className={` aspect-square h-6 rounded-full  border-anthracite-gray dark:border-white ${bg} ${
        checked ? 'border-4' : 'border'
      }`}
    >
      <input
        ref={checkboxRef}
        checked={checked}
        className="h-full w-full cursor-pointer opacity-0"
        type="checkbox"
        onChange={e =>
          e.currentTarget.checked ? setQueryParams(color.value) : removeQueryParams(color.value)
        }
      />
    </div>
  )
}
