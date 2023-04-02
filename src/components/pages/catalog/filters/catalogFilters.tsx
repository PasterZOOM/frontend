import { Dispatch, FC, SetStateAction, useState } from 'react'

import FilterContainer from '@/components/common/containers/filterContainer'
import AccordionWrapper from '@/components/common/ui/accordion/accordionWrapper'
import { ColorFilterCheckbox } from '@/components/common/ui/checkbox/colorFilterCheckbox'
import { MultipleFilter } from '@/components/pages/catalog/filters/multipleFilter'
import { ELeatherColor } from '@/enums/materials'
import { EProductAssignment, EProductCategory } from '@/enums/product'
import { useGetAllLeatherArticles } from '@/features/leatherArticles/hooks/useGetAllLeatherArticles'
import {
  EFilterKeys,
  FilterType,
  leatherColorFilters,
  productAssignmentsFilters,
  productCategoriesFilters,
} from '@/mocks/filters'

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
  // TODO: вынести в хук, заменить там, где еще используется
  const articles: FilterType<string, EFilterKeys.LEATHERS>[] = useGetAllLeatherArticles().map(
    ({ title, _id }) => ({
      _id,
      title,
      value: title,
      filterKey: EFilterKeys.LEATHERS,
    })
  )
  const [assignments] =
    useState<FilterType<EProductAssignment, EFilterKeys.ASSIGNMENTS>[]>(productAssignmentsFilters)
  const [categories] =
    useState<FilterType<EProductCategory, EFilterKeys.CATEGORIES>[]>(productCategoriesFilters)
  const [leathers] = useState<FilterType<string, EFilterKeys.LEATHERS>[]>(articles)
  const [colors] =
    useState<FilterType<ELeatherColor, EFilterKeys.LEATHER_COLORS>[]>(leatherColorFilters)

  return (
    <div className={`${className}`}>
      <FilterContainer open={isOpenFilters} setOpen={setIsOpenFilters} className="xl:top-18">
        <AccordionWrapper title="Назначение" classes={{ wrapper: 'xl:-mt-5' }}>
          <div className="px-4 pb-4 md:px-6 xl:px-0">
            {assignments.map(assignment => (
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
            {categories.map(category => (
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
            {colors.map(color => (
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
