import React, { ChangeEvent, KeyboardEvent, useMemo, useState } from 'react'

import { Button, ButtonVariant } from 'components/common/ui/buttons/button'
import { Input } from 'components/common/ui/inputs/input'
import { generatePaginationArray } from 'utils/arrays/generatePaginationArray'

type PaginatorPropsType = {
  pageSize: number
  totalItemsCount: number
  currentPage: number
  setCurrentPage: (page: number) => void
  nextButtonsCount?: number
}
const DEFAULT_NEXT_BUTTONS_COUNT = 2

export const Pagination: React.FC<PaginatorPropsType> = ({
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
      setInputValue(pageNumber)
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
    [currentPage, pagesCount]
  )

  return (
    <div className="flex justify-center gap-1">
      {buttons.map(page => (
        <div key={page.id}>
          {page.value === 0 && (
            <div className="flex h-full w-20 items-end justify-center">{page.title}</div>
          )}
          {page.value === currentPage && (
            <Input
              type="number"
              min={1}
              max={pagesCount}
              value={inputValue}
              onChange={onChangeInputNumberHandler}
              onKeyUp={onKeyEnter}
              className="h-full w-20"
            />
          )}
          {page.value !== 0 && page.value !== currentPage && (
            <Button
              type="button"
              variant={currentPage === page.value ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY}
              className="w-20 p-0"
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
