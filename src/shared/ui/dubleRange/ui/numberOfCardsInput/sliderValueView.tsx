import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  FC,
  KeyboardEventHandler,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react'

import classnames from 'classnames'

import cls from './numberOfCardsInput.module.scss'

import { useDebounce } from 'shared/lib/hooks/useDebounce'

type PropsType = Omit<
  ComponentPropsWithoutRef<'input'>,
  'onChange' | 'onKeyPress' | 'onKeyUp' | 'type' | 'value'
> & {
  className?: string
  onChangeValue?: (value: number) => void
  value?: number
}

const SliderValueView: FC<PropsType> = ({ className, onChangeValue, max, min, value, ...rest }) => {
  const [internalValue, setInternalValue] = useState(value || 0)
  const isArrowChange = useRef(false)
  const deb = useDebounce(internalValue)
  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
    const newValue = e.currentTarget.valueAsNumber

    setInternalValue(newValue)
  }

  useEffect(() => {
    if (isArrowChange.current) {
      onChangeValue?.(deb)
    }
  }, [deb, onChangeValue])

  const onKeyActionHandler: KeyboardEventHandler<HTMLInputElement> = e => {
    isArrowChange.current = e.key in { ArrowUp: 1, ArrowDown: 1 }
  }

  const onKeyEnter: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      const validValue = Math.min(Math.max(internalValue || Number(min), Number(min)), Number(max))

      onChangeValue?.(validValue)
      setInternalValue(validValue)
    }
  }

  useEffect(() => {
    setInternalValue(value || 0)
  }, [value])

  return (
    <input
      className={classnames(cls['slider-value-view'], className)}
      max={max}
      min={min}
      type="number"
      value={internalValue}
      onChange={onChangeHandler}
      onKeyDown={onKeyActionHandler}
      onKeyUp={onKeyEnter}
      {...rest}
    />
  )
}

const Memo = memo(SliderValueView)

export { Memo as SliderValueView }
