import { Dispatch, FC, SetStateAction, useState } from 'react'

import FilterContainer from '@/components/common/containers/filterContainer'
import AccordionWrapper from '@/components/common/ui/accordion/accordionWrapper'
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
        <AccordionWrapper title="Назначение">
          <div className="px-4 pb-4 md:px-6 lg:px-0">
            {assignments.map(assignment => (
              <div key={assignment.id}>{assignment.title}</div>
            ))}
          </div>
        </AccordionWrapper>
        <AccordionWrapper title="Категории">
          <div className="px-4 pb-4 md:px-6 lg:px-0">
            {categories.map(category => (
              <div key={category.id}>{category.title}</div>
            ))}
          </div>
        </AccordionWrapper>
        <AccordionWrapper title="Кожа">
          <div className="px-4 pb-4 md:px-6 lg:px-0">
            {leathers.map(leather => (
              <div key={leather.id}>{leather.title}</div>
            ))}
          </div>
        </AccordionWrapper>
        <AccordionWrapper title="Цвет">
          <div className="px-4 pb-4 md:px-6 lg:px-0">
            {colors.map(color => (
              <div key={color.id}>{color.title}</div>
            ))}
          </div>
        </AccordionWrapper>
      </FilterContainer>
    </div>
  )
}
