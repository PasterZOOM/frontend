import { FC, memo, useCallback, useEffect, useState } from 'react'

import classnames from 'classnames'
import { useTranslation } from 'next-i18next'

import cls from './sort.module.scss'

import { EFilterKeys } from 'shared/components/pages/catalog/filters/filters'
import { ESort } from 'shared/enums/sort'
import { useChangeQueryParams } from 'shared/lib/hooks/queryParams/useChangeQueryParams'
import { productSort, productSortArray } from 'shared/objects/products/productSort'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'
import { Select } from 'shared/ui/selects/select'

type PropsType = {
  className?: string
}
const SortElement: FC<Pick<SelectItemType, 'title'>> = ({ title }) => {
  const { t } = useTranslation('common')

  return <span>{t(title)}</span>
}
const defaultSort = ESort.NEW_FIRSTS

const Sort: FC<PropsType> = ({ className }) => {
  const [activeSort, setActiveSort] = useState<SelectItemType<ESort>>(productSort[defaultSort])

  const { changeParam, removeParam, queryParam } = useChangeQueryParams(EFilterKeys.SORT)

  const setActiveItemHandler = useCallback(
    (newActiveItem: SelectItemType<ESort>): void => {
      if (newActiveItem.value === defaultSort) {
        removeParam()
      } else {
        changeParam(newActiveItem.value)
      }
      setActiveSort(newActiveItem)
    },
    [changeParam, removeParam]
  )

  useEffect(() => {
    setActiveItemHandler(productSort[([queryParam].flat()[0] as ESort) || defaultSort])
    // eslint-disable-next-line
  }, [queryParam])

  return (
    <div className={classnames(className)}>
      <Select
        activeItem={activeSort}
        className={classnames(cls.sort)}
        elementToLabel={SortElement}
        items={productSortArray}
        setActiveItem={setActiveItemHandler}
      />
    </div>
  )
}

const Memo = memo(Sort)

export { Memo as Sort }
