import { FC } from 'react'

import classnames from 'classnames'
import { useTranslation } from 'next-i18next'

import { useGetAllLeatherArticles } from 'features/leatherArticles/hooks/useGetAllLeatherArticles'
import { SubWrapper } from 'shared/components/common/containers/subWrapper'
import {
  EFilterKeys,
  leatherColorFilters,
  productAssignmentsFilters,
  productCategoriesFilters,
} from 'shared/components/pages/catalog/filters/filters'
import { MultipleFilter } from 'shared/components/pages/catalog/filters/multipleFilter'
import AccordionWrapper from 'shared/ui/accordion/accordionWrapper'
import { ColorFilterCheckbox } from 'shared/ui/checkbox/colorFilterCheckbox'
import { PriceRange } from 'widgets/priceRange'
import { Sort } from 'widgets/sort'

type PropsType = {
  className?: string
  closeFilters: () => void
  isOpenFilters: boolean
}

export const CatalogFilters: FC<PropsType> = ({ isOpenFilters, closeFilters, className = '' }) => {
  const { t } = useTranslation('catalog')

  const { data } = useGetAllLeatherArticles()

  if (!data) return null

  const leathers = data.map(({ title, _id, value }) => ({
    _id,
    title,
    value,
    filterKey: EFilterKeys.LEATHERS,
  }))

  return (
    <div className={classnames(className, 'h-fit')}>
      <SubWrapper
        bias={isOpenFilters ? 'bottom-20 md:bottom-24' : '-bottom-full'}
        close={closeFilters}
        isOpen={isOpenFilters}
      >
        <Sort className="pb-4" />

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

        <PriceRange className="pb-4" />
      </SubWrapper>
    </div>
  )
}
