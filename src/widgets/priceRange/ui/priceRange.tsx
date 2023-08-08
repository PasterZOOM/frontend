import { FC, memo, useEffect, useRef, useState } from 'react'

import classnames from 'classnames'

import cls from './priceRange.module.scss'

import { useGetAllBasicProducts } from 'features/basicProducts/hooks/useGetAllBasicProducts'
import { EFilterKeys } from 'shared/components/pages/catalog/filters/filters'
import { useChangeQueryParams } from 'shared/lib/hooks/queryParams/useChangeQueryParams'
import { DoubleRange } from 'shared/ui/dubleRange'

type PropsType = {
  className?: string
}

const PriceRange: FC<PropsType> = ({ className }) => {
  const { data } = useGetAllBasicProducts()

  const isSetMinMaxValue = useRef(false)

  const [minRangeValue, setMinRangeValue] = useState(0)
  const [maxRangeValue, setMaxRangeValue] = useState(0)

  const [value0, setValue0] = useState(minRangeValue)
  const [value1, setValue1] = useState(maxRangeValue)

  const {
    changeParam: changeMinPrice,
    removeParam: removeMinPrice,
    queryParam: minPriceQueryParam,
  } = useChangeQueryParams(EFilterKeys.MIN_PRICE)
  const {
    changeParam: changeMaxPrice,
    removeParam: removeMaxPrice,
    queryParam: maxPriceQueryParam,
  } = useChangeQueryParams(EFilterKeys.MAX_PRICE)

  const onChangeCommittedMinValueHandler = (value: number): void => {
    if (value === minRangeValue) {
      removeMinPrice()
    } else {
      changeMinPrice(`${value}`)
    }
  }

  const onChangeCommittedMaxValueHandler = (value: number): void => {
    if (value === maxRangeValue) {
      removeMaxPrice()
    } else {
      changeMaxPrice(`${value}`)
    }
  }

  useEffect(() => {
    setValue0(Number(minPriceQueryParam) || minRangeValue)
  }, [minPriceQueryParam, minRangeValue])

  useEffect(() => {
    setValue1(Number(maxPriceQueryParam) || maxRangeValue)
  }, [maxPriceQueryParam, maxRangeValue])

  useEffect(() => {
    if (!isSetMinMaxValue.current) {
      setMinRangeValue(data?.minPrice || 0)
      setMaxRangeValue(data?.maxPrice || 0)
      if (data) {
        isSetMinMaxValue.current = true
      }
    }
  }, [data])

  return (
    <div className={classnames(cls['price-range'], className)}>
      <DoubleRange
        maxRangeValue={maxRangeValue}
        minRangeValue={minRangeValue}
        setValue0={setValue0}
        setValue1={setValue1}
        value0={value0}
        value1={value1}
        onChangeCommitted0={onChangeCommittedMinValueHandler}
        onChangeCommitted1={onChangeCommittedMaxValueHandler}
      />
    </div>
  )
}

const Memo = memo(PriceRange)

export { Memo as PriceRange }
