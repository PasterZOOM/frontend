import { FC, ReactNode } from 'react'

import Link from 'next/link'

type PropsType = {
  children: ReactNode
}

export const CrmMenuLayout: FC<PropsType> = ({ children }) => {
  return (
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
      <div className="w-full p-2">{children}</div>
    </div>
  )
}
