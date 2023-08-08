import { Dispatch, FC, SetStateAction, useEffect } from 'react'

import { useTranslation } from 'next-i18next'

import { useGetAllLeatherArticles } from 'features/leatherArticles/hooks/useGetAllLeatherArticles'
import FilterContainer from 'shared/components/common/containers/filterContainer'
import {
  EFilterKeys,
  leatherColorFilters,
  productAssignmentsFilters,
  productCategoriesFilters,
} from 'shared/components/pages/catalog/filters/filters'
import { MultipleFilter } from 'shared/components/pages/catalog/filters/multipleFilter'
import { useLocale } from 'shared/lib/hooks/useLocale'
import AccordionWrapper from 'shared/ui/accordion/accordionWrapper'
import { ColorFilterCheckbox } from 'shared/ui/checkbox/colorFilterCheckbox'
import { PriceRange } from 'widgets/priceRange'
import { Sort } from 'widgets/sort'

type PropsType = {
  className?: string
  isOpenFilters: boolean
  setIsOpenFilters: Dispatch<SetStateAction<boolean>>
}

export const CatalogFilters: FC<PropsType> = ({
  isOpenFilters,
  setIsOpenFilters,
  className = '',
}) => {
  const locale = useLocale()
  const { t } = useTranslation('catalog')

  const { data, refetch } = useGetAllLeatherArticles()

  useEffect(() => {
    refetch().then()
  }, [locale, refetch])

  if (!data) return null

  const leathers = data.map(({ title, _id, value }) => ({
    _id,
    title,
    value,
    filterKey: EFilterKeys.LEATHERS,
  }))

  return (
    <div className={className}>
      <FilterContainer className="xl:top-18" open={isOpenFilters} setOpen={setIsOpenFilters}>
        <AccordionWrapper classes={{ wrapper: 'xl:-mt-5' }} title={t('assignments')}>
          <div className="px-4 pb-4 md:px-6 xl:px-0">
            {productAssignmentsFilters().map(assignment => (
              <MultipleFilter
                key={assignment._id}
                filterKey={EFilterKeys.ASSIGNMENTS}
                item={assignment}
              />
            ))}
          </div>
        </AccordionWrapper>
        <AccordionWrapper title={t('category')}>
          <div className="px-4 pb-4 md:px-6 xl:px-0">
            {productCategoriesFilters().map(category => (
              <MultipleFilter
                key={category._id}
                filterKey={EFilterKeys.CATEGORIES}
                item={category}
              />
            ))}
          </div>
        </AccordionWrapper>
        <AccordionWrapper title={t('leather')}>
          <div className="px-4 pb-4 md:px-6 xl:px-0">
            {leathers.map(leather => (
              <MultipleFilter key={leather._id} filterKey={EFilterKeys.LEATHERS} item={leather} />
            ))}
          </div>
        </AccordionWrapper>
        <AccordionWrapper title={t('color')}>
          <div className="flex flex-wrap gap-3 px-4 pb-4 md:px-6 xl:px-0">
            {leatherColorFilters().map(color => (
              <ColorFilterCheckbox
                key={color._id}
                color={color}
                filterKey={EFilterKeys.LEATHER_COLORS}
              />
            ))}
          </div>
        </AccordionWrapper>

        <Sort className="pb-4" />
        <PriceRange className="pb-4" />
      </FilterContainer>
    </div>
  )
}
