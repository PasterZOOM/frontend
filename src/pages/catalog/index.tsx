import { FC } from 'react'

import { CurrentCurrencySelect } from '@/components/common/ui/selects/currentCurrencySelect'
import Products from '@/components/pages/catalog/products'

const Catalog: FC = () => {
  return (
    <div className="flex gap-2">
      <div className="w-full max-w-xs">
        <CurrentCurrencySelect />
      </div>
      <Products />
    </div>
  )
}

export default Catalog
