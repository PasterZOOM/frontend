import { FC, useState } from 'react'

import { MainContainer } from 'components/common/containers/mainContainer'
import FilterButtons from 'components/common/ui/buttons/filterButtons'
import { Pagination } from 'components/common/ui/pagination/pagination'
import { CatalogFilters } from 'components/pages/catalog/filters/catalogFilters'
import Products from 'components/pages/catalog/products'
import { ProductSearch } from 'components/pages/catalog/productSearch'

export const Catalog: FC = () => {
  const [isOpenFilters, setIsOpenFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <>
      <MainContainer className="min-h-[calc(100vh-9.625rem)] grid-cols-12 gap-6 py-5 md:min-h-[calc(100vh-10.625rem)] xl:grid xl:min-h-fit">
        <CatalogFilters
          isOpenFilters={isOpenFilters}
          setIsOpenFilters={setIsOpenFilters}
          className="col-span-2"
        />
        <div className="col-span-10 space-y-4">
          <ProductSearch />
          <Products />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={10}
            totalItemsCount={200}
          />
        </div>
      </MainContainer>
      {/* кнопки фильтров для мобильной версии */}
      <FilterButtons open={isOpenFilters} setOpen={setIsOpenFilters} />
    </>
  )
}
