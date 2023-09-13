import { ComponentPropsWithoutRef, FC, memo } from 'react'

import classnames from 'classnames'

import cls from './burgerButton.module.scss'

type PropsType = ComponentPropsWithoutRef<'button'> & {
  className?: string
}

const BurgerButton: FC<PropsType> = ({ className, ...rest }) => {
  return (
    <div className={classnames(cls.burgerButton, className)}>
      <button className={classnames(cls.toggle, cls.toggle2)} type="button" {...rest}>
        <div className={classnames(cls.bars, cls.bar1)} />
        <div className={classnames(cls.bars, cls.bar2)} />
        <div className={classnames(cls.bars, cls.bar3)} />
      </button>
    </div>
  )
}

const Memo = memo(BurgerButton)

export { Memo as BurgerButton }
