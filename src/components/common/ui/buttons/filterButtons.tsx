import { FC } from 'react'

import { Button, ButtonVariant } from 'components/common/ui/buttons/button'
import { useClearAllQueryParams } from 'hooks/queryParams/useClearAllQueryParams'

interface FilterButtonsProps {
  open: boolean
  setOpen: (value: boolean) => void
}

const FilterButtons: FC<FilterButtonsProps> = ({ open, setOpen }) => {
  const clearAll = useClearAllQueryParams()

  return (
    <div
      className={`sticky bottom-0 left-0 right-0 z-50 flex w-full gap-3 bg-white p-4 dark:bg-anthracite-gray md:p-6 xl:hidden ${
        open ? '' : 'shadow-line-top dark:shadow-line-top-dark'
      }`}
    >
      {open ? (
        <>
          <Button className="w-full" variant={ButtonVariant.SECONDARY} onClick={clearAll}>
            Очистить
          </Button>
          <Button className="w-full" onClick={() => setOpen(false)}>
            Применить
          </Button>
        </>
      ) : (
        <Button onClick={() => setOpen(true)} className="w-full">
          Фильтра
        </Button>
      )}
    </div>
  )
}

export default FilterButtons
