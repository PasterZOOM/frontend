import { ReactElement, ReactNode } from 'react'

import Link from 'next/link'

import Header from '@/components/common/header/header'

export const CrmLayout = (page: ReactElement): ReactNode => {
  return (
    <>
      <Header />
      <div className="flex">
        <div className="w-1/6 space-y-2 pr-2">
          <div className="flex flex-col gap-2 pl-2">
            <div>Материалы</div>
            <Link href="/crm/materials/leather" className="pl-2 text-blue-500 hover:text-blue-400">
              Кожа
            </Link>
            <Link href="/crm/materials/threads" className="pl-2 text-blue-500 hover:text-blue-400">
              Нитки
            </Link>
          </div>
          <div className="flex flex-col gap-2 pl-2">
            <Link href="/crm/basic-products" className="text-blue-500 hover:text-blue-400">
              Базовые изделия
            </Link>
          </div>
        </div>
        <div className="w-full max-w-screen-2xl p-2">{page}</div>
      </div>
    </>
  )
}
