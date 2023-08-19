import { FC, memo, useEffect, useRef, useState } from 'react'

import classnames from 'classnames'

import cls from './priceRange.module.scss'

import { useGetAllBasicProducts } from 'features/basicProducts/hooks/useGetAllBasicProducts'
import {
  selectGetCurrentPrice,
  selectGetDefaultPrice,
  useCurrencyRatesStore,
} from 'features/currancy/store/useCurrencyRatesStore'
import { EFilterKeys } from 'shared/components/pages/catalog/filters/filters'
import { useChangeQueryFiltersParams } from 'shared/lib/hooks/queryParams/useChangeQueryFiltersParams'
import { DoubleRange } from 'shared/ui/dubleRange'
import { selectCurrentCurrency, useUserSettings } from 'store/useUserSettings'

type PropsType = {
  className?: string
}

const PriceRange: FC<PropsType> = ({ className }) => {
  const { data } = useGetAllBasicProducts()

  const currentCurrency = useUserSettings(selectCurrentCurrency)

  const getCurrentPrice = useCurrencyRatesStore(selectGetCurrentPrice)
  const getDefaultPrice = useCurrencyRatesStore(selectGetDefaultPrice)

  const isSetMinMaxValue = useRef(false)

  const [minRangeValue, setMinRangeValue] = useState(0)
  const [maxRangeValue, setMaxRangeValue] = useState(0)

  const stateFromThumb0 = useState(minRangeValue)
  const [, setValue0] = stateFromThumb0

  const stateFromThumb1 = useState(maxRangeValue)
  const [, setValue1] = stateFromThumb1

  const {
    changeParam: changeMinPrice,
    removeParam: removeMinPrice,
    queryParam: minPriceQueryParam,
  } = useChangeQueryFiltersParams(EFilterKeys.MIN_PRICE)
  const {
    changeParam: changeMaxPrice,
    removeParam: removeMaxPrice,
    queryParam: maxPriceQueryParam,
  } = useChangeQueryFiltersParams(EFilterKeys.MAX_PRICE)

  const onChangeCommittedMinValueHandler = (value: number): void => {
    if (value === minRangeValue) {
      removeMinPrice()
    } else {
      changeMinPrice(`${getDefaultPrice(value, currentCurrency)}`)
    }
  }
  const onChangeCommittedMaxValueHandler = (value: number): void => {
    if (value === maxRangeValue) {
      removeMaxPrice()
    } else {
      changeMaxPrice(`${getDefaultPrice(value, currentCurrency)}`)
    }
  }

  useEffect(() => {
    const newValue = minPriceQueryParam
      ? Math.round(getCurrentPrice(+minPriceQueryParam || 0, currentCurrency))
      : minRangeValue

    setValue0(newValue)
  }, [currentCurrency, getCurrentPrice, minPriceQueryParam, minRangeValue, setValue0])

  useEffect(() => {
    const newValue = maxPriceQueryParam
      ? Math.round(getCurrentPrice(+maxPriceQueryParam || 0, currentCurrency))
      : maxRangeValue

    setValue1(newValue)
  }, [currentCurrency, getCurrentPrice, maxPriceQueryParam, maxRangeValue, setValue1])

  useEffect(() => {
    if (!isSetMinMaxValue.current) {
      const initValue0 = Math.round(getCurrentPrice(data?.minPrice || 0, currentCurrency))
      const initValue1 = Math.round(getCurrentPrice(data?.maxPrice || 0, currentCurrency))

      setMinRangeValue(initValue0)
      setMaxRangeValue(initValue1)
      setValue0(initValue0)
      setValue1(initValue1)
      if (data) {
        isSetMinMaxValue.current = true
      }
    }
  }, [currentCurrency, data, getCurrentPrice, setValue0, setValue1])

  useEffect(() => {
    const initValue0 = Math.round(getCurrentPrice(data?.minPrice || 0, currentCurrency))
    const initValue1 = Math.round(getCurrentPrice(data?.maxPrice || 0, currentCurrency))

    setMinRangeValue(initValue0)
    setMaxRangeValue(initValue1)
    // eslint-disable-next-line
  }, [currentCurrency, getCurrentPrice])

  return (
    <div className={classnames(cls.priceRange, className)}>
      <DoubleRange
        maxRangeValue={maxRangeValue}
        minRangeValue={minRangeValue}
        state0={stateFromThumb0}
        state1={stateFromThumb1}
        onChangeCommitted0={onChangeCommittedMinValueHandler}
        onChangeCommitted1={onChangeCommittedMaxValueHandler}
      />
    </div>
  )
}

const Memo = memo(PriceRange)

export { Memo as PriceRange }
