import { Dispatch, FC, SetStateAction } from 'react'

import FilterContainer from '@/components/common/containers/filterContainer'
import AccordionWrapper from '@/components/common/ui/accordion/accordionWrapper'
import { ColorFilterCheckbox } from '@/components/common/ui/checkbox/colorFilterCheckbox'
import {
  EFilterKeys,
  leatherColorFilters,
  productAssignmentsFilters,
  productCategoriesFilters,
} from '@/components/pages/catalog/filters/filters'
import { MultipleFilter } from '@/components/pages/catalog/filters/multipleFilter'
import { useGetAllLeatherArticles } from '@/features/leatherArticles/hooks/useGetAllLeatherArticles'

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
  const { data } = useGetAllLeatherArticles()

  if (!data) return null

  const leathers = data.map(({ title, _id }) => ({
    _id,
    title,
    value: title,
    filterKey: EFilterKeys.LEATHERS,
  }))

  return (
    <div className={`${className}`}>
      <FilterContainer open={isOpenFilters} setOpen={setIsOpenFilters} className="xl:top-18">
        <AccordionWrapper title="Назначение" classes={{ wrapper: 'xl:-mt-5' }}>
          <div className="px-4 pb-4 md:px-6 xl:px-0">
            {productAssignmentsFilters.map(assignment => (
              <MultipleFilter
                key={assignment._id}
                item={assignment}
                filterKey={EFilterKeys.ASSIGNMENTS}
              />
            ))}
          </div>
        </AccordionWrapper>
        <AccordionWrapper title="Категории">
          <div className="px-4 pb-4 md:px-6 xl:px-0">
            {productCategoriesFilters.map(category => (
              <MultipleFilter
                key={category._id}
                item={category}
                filterKey={EFilterKeys.CATEGORIES}
              />
            ))}
          </div>
        </AccordionWrapper>
        <AccordionWrapper title="Кожа">
          <div className="px-4 pb-4 md:px-6 xl:px-0">
            {leathers.map(leather => (
              <MultipleFilter key={leather._id} item={leather} filterKey={EFilterKeys.LEATHERS} />
            ))}
          </div>
        </AccordionWrapper>
        <AccordionWrapper title="Цвет">
          <div className="flex flex-wrap gap-3 px-4 pb-4 md:px-6 xl:px-0">
            {leatherColorFilters.map(color => (
              <ColorFilterCheckbox
                key={color._id}
                color={color}
                filterKey={EFilterKeys.LEATHER_COLORS} // TODO: при выборе цвета присылать только изделия только с этим цветом, остальных цветов в карточке быть не должно
              />
            ))}
          </div>
        </AccordionWrapper>
      </FilterContainer>
    </div>
  )
}
