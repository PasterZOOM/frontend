import { FC, memo } from 'react'

import classnames from 'classnames'

import cls from './thumb.module.scss'

type PropsType = {
  className?: string
  isActive: boolean
}

const Thumb: FC<PropsType> = ({ className, isActive }) => {
  return <div className={classnames(cls.thumb, className, { [cls.isActive]: isActive })} />
}

const Memo = memo(Thumb)

export { Memo as Thumb }
