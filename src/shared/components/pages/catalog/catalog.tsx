import { FC } from 'react'

import { MainContainer } from 'shared/components/common/containers/mainContainer'
import { CatalogFilters } from 'shared/components/pages/catalog/filters/catalogFilters'
import { ProductPagination } from 'shared/components/pages/catalog/productPagination'
import Products from 'shared/components/pages/catalog/products'
import { ProductSearch } from 'shared/components/pages/catalog/productSearch'
import { useDisclosure } from 'shared/lib/hooks/useDisclosure'
import { FilterButtons } from 'shared/ui/buttons/filterButtons'

export const Catalog: FC = () => {
  const [isOpenFilters, { open, close }] = useDisclosure(false)

  return (
    <>
      <MainContainer className="relative min-h-[calc(100vh-9.625rem)] grid-cols-12 gap-6 py-5 md:min-h-[calc(100vh-10.625rem)] xl:grid xl:min-h-fit">
        <CatalogFilters className="col-span-2" closeFilters={close} isOpenFilters={isOpenFilters} />
        <div className="col-span-10 space-y-4">
          <ProductSearch />
          <Products />
          <ProductPagination />
        </div>
      </MainContainer>
      {/* кнопки фильтров для мобильной версии */}
      <FilterButtons closeFilters={close} isOpen={isOpenFilters} openFilters={open} />
    </>
  )
}
