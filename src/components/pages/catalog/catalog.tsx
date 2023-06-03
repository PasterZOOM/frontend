import { FC, useState } from 'react'

import { MainContainer } from 'components/common/containers/mainContainer'
import FilterButtons from 'components/common/ui/buttons/filterButtons'
import { CatalogFilters } from 'components/pages/catalog/filters/catalogFilters'
import Products from 'components/pages/catalog/products'

export const Catalog: FC = () => {
  const [isOpenFilters, setIsOpenFilters] = useState(false)

  return (
    <>
      <MainContainer className="min-h-[calc(100vh-9.625rem)] grid-cols-12 gap-6 py-5 md:min-h-[calc(100vh-10.625rem)] xl:grid xl:min-h-fit">
        <CatalogFilters
          isOpenFilters={isOpenFilters}
          setIsOpenFilters={setIsOpenFilters}
          className="col-span-2"
        />
        <Products className="col-span-10" />
      </MainContainer>
      {/* кнопки фильтров для мобильной версии */}
      <FilterButtons open={isOpenFilters} setOpen={setIsOpenFilters} />
    </>
  )
}
