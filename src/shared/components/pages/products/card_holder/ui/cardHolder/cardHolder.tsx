import { FC, memo } from 'react'

import classnames from 'classnames'
import { useTranslation } from 'next-i18next'

import cls from './cardHolder.module.scss'

type PropsType = {
  className?: string
}

const CardHolder: FC<PropsType> = ({ className }) => {
  const { t } = useTranslation()

  return <div className={classnames(cls.cardHolder, className)}>{t('card holder')}</div>
}

const Memo = memo(CardHolder)

export { Memo as CardHolder }
