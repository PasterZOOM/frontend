import { FC, memo } from 'react'

import classnames from 'classnames'

import cls from './loader.module.scss'

type PropsType = {
  className?: string
}

const Loader: FC<PropsType> = ({ className }) => {
  return (
    <div className={classnames(cls.wrapper, className)}>
      <div className={classnames(cls.loader)} />
    </div>
  )
}

const Memo = memo(Loader)

export { Memo as Loader }
