import { FC, memo, useRef } from 'react'

import { EFilterKeys, FilterType } from '@/shared/components/pages/catalog/filters/filters'
import { ELeatherColor } from '@/shared/enums/materials'
import { useChangeMultipleQueryParams } from '@/shared/lib/hooks/queryParams/useChangeMultipleQueryParams'

type PropsType = {
  color: FilterType<EFilterKeys, ELeatherColor>
  filterKey: EFilterKeys
}

const bgColors: Record<ELeatherColor, string> = {
  [ELeatherColor.RED]: 'bg-red-700',
  [ELeatherColor.BLACK]: 'bg-black',
  [ELeatherColor.GREEN]: 'bg-green-700',
  [ELeatherColor.BLUE]: 'bg-blue-800',
  [ELeatherColor.BROWN]: 'bg-yellow-900',
  [ELeatherColor.CAMOUFLAGE]: 'bg-yellow-500',
}

const ColorFilterCheckbox: FC<PropsType> = ({ color, filterKey }: PropsType) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null)

  const { setQueryParams, removeQueryParams, queryParam } = useChangeMultipleQueryParams(filterKey)

  const checked = [queryParam].flat().includes(color.value)

  return (
    <div
      className={`aspect-square h-6 rounded-full  border-anthracite-gray dark:border-white ${
        bgColors[color.value]
      } ${checked ? 'border-4' : 'border'}`}
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

const Memo = memo(ColorFilterCheckbox)

export { Memo as ColorFilterCheckbox }
