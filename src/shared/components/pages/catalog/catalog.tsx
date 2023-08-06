import { FC, useState } from 'react'

import { MainContainer } from 'shared/components/common/containers/mainContainer'
import { CatalogFilters } from 'shared/components/pages/catalog/filters/catalogFilters'
import { ProductPagination } from 'shared/components/pages/catalog/productPagination'
import Products from 'shared/components/pages/catalog/products'
import { ProductSearch } from 'shared/components/pages/catalog/productSearch'
import FilterButtons from 'shared/ui/buttons/filterButtons'

export const Catalog: FC = () => {
  const [isOpenFilters, setIsOpenFilters] = useState(false)

  return (
    <>
      <MainContainer className="min-h-[calc(100vh-9.625rem)] grid-cols-12 gap-6 py-5 md:min-h-[calc(100vh-10.625rem)] xl:grid xl:min-h-fit">
        <CatalogFilters
          className="col-span-2"
          isOpenFilters={isOpenFilters}
          setIsOpenFilters={setIsOpenFilters}
        />
        <div className="col-span-10 space-y-4">
          <ProductSearch />
          <Products />
          <ProductPagination />
        </div>
      </MainContainer>
      {/* кнопки фильтров для мобильной версии */}
      <FilterButtons open={isOpenFilters} setOpen={setIsOpenFilters} />
    </>
  )
}
