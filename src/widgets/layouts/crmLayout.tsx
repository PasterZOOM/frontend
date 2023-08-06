import { ReactElement } from 'react'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import Header from 'shared/components/common/header/header'

export const CrmLayout = (page: ReactElement): ReactElement => {
  const { t } = useTranslation()

  return (
    <>
      <Header />
      <div className="flex">
        <div className="w-1/6 space-y-2 pr-2">
          <div className="flex flex-col gap-2 pl-2">
            <div>{t('Материалы')}</div>
            <Link className="pl-2 text-blue-500 hover:text-blue-400" href="/crm/materials/leather">
              {t('Кожа')}
            </Link>
            <Link className="pl-2 text-blue-500 hover:text-blue-400" href="/crm/materials/threads">
              {t('Нитки')}
            </Link>
          </div>
          <div className="flex flex-col gap-2 pl-2">
            <Link className="text-blue-500 hover:text-blue-400" href="/crm/basic-products">
              {t('Базовые изделия')}
            </Link>
          </div>
        </div>
        <div className="w-full max-w-screen-2xl p-2">{page}</div>
      </div>
    </>
  )
}
