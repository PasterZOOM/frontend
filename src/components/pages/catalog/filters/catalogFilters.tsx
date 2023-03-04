import { Dispatch, FC, SetStateAction, useState } from 'react'

import { Filter } from './filter'

import FilterContainer from '@/components/common/containers/filterContainer'
import AccordionWrapper from '@/components/common/ui/accordion/accordionWrapper'
import { ColorFilterCheckbox } from '@/components/common/ui/checkbox/colorFilterCheckbox'
import { TLeather, TLeatherColor } from '@/enums/materials'
import { TProductAssignment, TProductCategory } from '@/enums/product'
import {
  assignmentFilters,
  FilterType,
  leatherColorFilters,
  leatherFilters,
  productCategoryFilters,
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
  const [assignments] = useState<FilterType<TProductAssignment>[]>(assignmentFilters)
  const [categories] = useState<FilterType<TProductCategory>[]>(productCategoryFilters)
  const [leathers] = useState<FilterType<TLeather>[]>(leatherFilters)
  const [colors] = useState<FilterType<TLeatherColor>[]>(leatherColorFilters)

  return (
    <div className={`${className}`}>
      <FilterContainer open={isOpenFilters} setOpen={setIsOpenFilters} className="lg:top-18">
        <AccordionWrapper title="Назначение" classes={{ wrapper: '-mt-5' }}>
          <div className="px-4 pb-4 md:px-6 lg:px-0">
            {assignments.map(assignment => (
              <Filter key={assignment.id} item={assignment} filterKey="assignments" />
            ))}
          </div>
        </AccordionWrapper>
        <AccordionWrapper title="Категории">
          <div className="px-4 pb-4 md:px-6 lg:px-0">
            {categories.map(category => (
              <Filter key={category.id} item={category} filterKey="category" />
            ))}
          </div>
        </AccordionWrapper>
        <AccordionWrapper title="Кожа">
          <div className="px-4 pb-4 md:px-6 lg:px-0">
            {leathers.map(leather => (
              <Filter key={leather.id} item={leather} filterKey="leather" />
            ))}
          </div>
        </AccordionWrapper>
        <AccordionWrapper title="Цвет">
          <div className="flex flex-wrap gap-3 px-4 pb-4 md:px-6 lg:px-0">
            {colors.map(color => (
              <ColorFilterCheckbox key={color.id} color={color} filterKey="leatherColor" />
            ))}
          </div>
        </AccordionWrapper>
      </FilterContainer>
    </div>
  )
}
