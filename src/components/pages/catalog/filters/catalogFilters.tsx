import { Dispatch, FC, SetStateAction, useEffect } from 'react'

import { useTranslation } from 'next-i18next'

import FilterContainer from 'components/common/containers/filterContainer'
import AccordionWrapper from 'components/common/ui/accordion/accordionWrapper'
import { ColorFilterCheckbox } from 'components/common/ui/checkbox/colorFilterCheckbox'
import {
  EFilterKeys,
  leatherColorFilters,
  productAssignmentsFilters,
  productCategoriesFilters,
} from 'components/pages/catalog/filters/filters'
import { MultipleFilter } from 'components/pages/catalog/filters/multipleFilter'
import { useGetAllLeatherArticles } from 'features/leatherArticles/hooks/useGetAllLeatherArticles'
import { useLocale } from 'hooks/useLocale'

type PropsType = {
  isOpenFilters: boolean
  setIsOpenFilters: Dispatch<SetStateAction<boolean>>
  className?: string
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
  }, [locale])

  if (!data) return null

  const leathers = data.map(({ title, _id, value }) => ({
    _id,
    title,
    value,
    filterKey: EFilterKeys.LEATHERS,
  }))

  return (
    <div className={`${className}`}>
      <FilterContainer open={isOpenFilters} setOpen={setIsOpenFilters} className="xl:top-18">
        <AccordionWrapper title={t('assignments')} classes={{ wrapper: 'xl:-mt-5' }}>
          <div className="px-4 pb-4 md:px-6 xl:px-0">
            {productAssignmentsFilters().map(assignment => (
              <MultipleFilter
                key={assignment._id}
                item={assignment}
                filterKey={EFilterKeys.ASSIGNMENTS}
              />
            ))}
          </div>
        </AccordionWrapper>
        <AccordionWrapper title={t('category')}>
          <div className="px-4 pb-4 md:px-6 xl:px-0">
            {productCategoriesFilters().map(category => (
              <MultipleFilter
                key={category._id}
                item={category}
                filterKey={EFilterKeys.CATEGORIES}
              />
            ))}
          </div>
        </AccordionWrapper>
        <AccordionWrapper title={t('leather')}>
          <div className="px-4 pb-4 md:px-6 xl:px-0">
            {leathers.map(leather => (
              <MultipleFilter key={leather._id} item={leather} filterKey={EFilterKeys.LEATHERS} />
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
      </FilterContainer>
    </div>
  )
}
