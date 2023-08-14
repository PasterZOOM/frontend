import {
  ChangeEventHandler,
  Dispatch,
  FC,
  memo,
  MouseEvent,
  SetStateAction,
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react'

import classnames from 'classnames'

import { SliderValueView } from '../numberOfCardsInput/sliderValueView'

import cls from './doubleRange.module.scss'

const HUNDRED = 100

type PropsType = {
  className?: string
  maxRangeValue: number
  minRangeValue: number
  onChangeCommitted0: (value: number) => void
  onChangeCommitted1: (value: number) => void
  state0: [number, Dispatch<SetStateAction<number>>]
  state1: [number, Dispatch<SetStateAction<number>>]
}

const DoubleRange: FC<PropsType> = ({
  minRangeValue,
  maxRangeValue,
  className,
  onChangeCommitted0,
  onChangeCommitted1,
  state0: [value0, setValue0],
  state1: [value1, setValue1],
}) => {
  const range = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValue0(minRangeValue)
  }, [minRangeValue, setValue0])

  useEffect(() => {
    setValue1(maxRangeValue)
  }, [maxRangeValue, setValue1])

  const getValue = useCallback(
    (value: number) => {
      return Math.round(minRangeValue + (value * (maxRangeValue - minRangeValue)) / HUNDRED || 0)
    },
    [minRangeValue, maxRangeValue]
  )
  const getRangeValue = useCallback(
    (value: number) => {
      return Math.round(((value - minRangeValue) * HUNDRED) / (maxRangeValue - minRangeValue)) || 0
    },
    [minRangeValue, maxRangeValue]
  )

  // Срабатывают при перемещении range
  const onChangeThumb0: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      setValue0(getValue(Math.min(e.currentTarget.valueAsNumber, getRangeValue(value1))))
    },
    [setValue0, getValue, getRangeValue, value1]
  )
  const onChangeThumb1: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      setValue1(getValue(Math.max(e.currentTarget.valueAsNumber, getRangeValue(value0))))
    },
    [setValue1, getValue, getRangeValue, value0]
  )

  // Срабатывают при фиксации range
  const onChangeCommittedFirst = useCallback(
    (e: MouseEvent<HTMLInputElement> | TouchEvent<HTMLInputElement>) => {
      onChangeCommitted0(getValue(Math.min(e.currentTarget.valueAsNumber, getRangeValue(value1))))
    },
    [getRangeValue, getValue, onChangeCommitted0, value1]
  )
  const onChangeCommittedSecond = useCallback(
    (e: MouseEvent<HTMLInputElement> | TouchEvent<HTMLInputElement>) => {
      onChangeCommitted1(getValue(Math.max(e.currentTarget.valueAsNumber, getRangeValue(value0))))
    },
    [getRangeValue, getValue, onChangeCommitted1, value0]
  )

  // Срабатывают при изменении значений в SliderValueView
  const onSliderValueViewChangeFirstValue = useCallback(
    (value: number): void => {
      setValue0(value)
      onChangeCommitted0(value)
    },
    [setValue0, onChangeCommitted0]
  )
  const onSliderValueViewChangeSecondValue = useCallback(
    (value: number): void => {
      setValue1(value)
      onChangeCommitted1(value)
    },
    [setValue1, onChangeCommitted1]
  )

  useEffect(() => {
    if (range.current) {
      range.current.style.left = `${getRangeValue(value0)}%`
      range.current.style.width = `${getRangeValue(value1) - getRangeValue(value0)}%`
    }
  }, [getRangeValue, value1, value0])

  return (
    <div className={classnames(className, cls.doubleRange)}>
      <SliderValueView
        max={Math.min(maxRangeValue, value1)}
        min={minRangeValue}
        value={value0}
        onChangeValue={onSliderValueViewChangeFirstValue}
      />

      <div className={classnames(cls.slider)}>
        <input
          className={classnames(cls.thumb, cls.thumbLeft)}
          type="range"
          value={getRangeValue(value0)}
          onChange={onChangeThumb0}
          onMouseUp={onChangeCommittedFirst}
          onTouchEnd={onChangeCommittedFirst}
        />
        <input
          className={classnames(cls.thumb, cls.thumbRight)}
          type="range"
          value={getRangeValue(value1)}
          onChange={onChangeThumb1}
          onMouseUp={onChangeCommittedSecond}
          onTouchEnd={onChangeCommittedSecond}
        />
        <div className={classnames(cls.sliderTrack)} />
        <div ref={range} className={classnames(cls.sliderRange)} />
      </div>

      <SliderValueView
        max={maxRangeValue}
        min={Math.max(minRangeValue, value0)}
        value={value1}
        onChangeValue={onSliderValueViewChangeSecondValue}
      />
    </div>
  )
}

const Memo = memo(DoubleRange)

export { Memo as DoubleRange }
