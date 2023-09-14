import { ChangeEvent, FC, KeyboardEvent, useEffect, useMemo, useState } from 'react'

import { generatePaginationArray } from '../model/lib/generatePaginationArray'

import { Button, ButtonVariant } from '@/shared/ui/buttons/button'
import { Input } from '@/shared/ui/inputs/input'

type PaginatorPropsType = {
  currentPage: number
  nextButtonsCount?: number
  pageSize: number
  setCurrentPage: (page: number) => void
  totalItemsCount: number
}
const DEFAULT_NEXT_BUTTONS_COUNT = 4

export const Pagination: FC<PaginatorPropsType> = ({
  pageSize,
  totalItemsCount,
  setCurrentPage,
  currentPage,
  nextButtonsCount = DEFAULT_NEXT_BUTTONS_COUNT,
}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize)

  const [inputValue, setInputValue] = useState(currentPage)

  const onPageChanged = (pageNumber: number): void => {
    if (inputValue) {
      setCurrentPage(pageNumber)
    }
  }

  const onChangeInputNumberHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget.valueAsNumber > pagesCount) setInputValue(Math.floor(pagesCount))
    else if (e.currentTarget.valueAsNumber < 1) setInputValue(1)
    else setInputValue(e.currentTarget.valueAsNumber)
  }

  const onKeyEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      onPageChanged(inputValue)
    }
  }

  const buttons = useMemo(
    () => generatePaginationArray(currentPage, pagesCount, nextButtonsCount),
    [currentPage, nextButtonsCount, pagesCount]
  )

  useEffect(() => {
    setInputValue(currentPage)
  }, [currentPage])

  return (
    <div className="flex justify-center gap-1">
      {buttons.map(page => (
        <div key={page.id}>
          {page.value === 0 && (
            <div className="flex h-full w-20 items-end justify-center">{page.title}</div>
          )}
          {page.value === currentPage && (
            <Input
              className="h-full w-20"
              max={pagesCount}
              min={1}
              type="number"
              value={inputValue}
              onChange={onChangeInputNumberHandler}
              onKeyUp={onKeyEnter}
            />
          )}
          {page.value !== 0 && page.value !== currentPage && (
            <Button
              className="w-20 p-0"
              type="button"
              variant={currentPage === page.value ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY}
              onClick={() => onPageChanged(page.value)}
            >
              {page.title}
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
