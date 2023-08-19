import { FC, memo } from 'react'

import classnames from 'classnames'

import cls from './productColorsButtons.module.scss'

import { ProductColorType } from 'features/basicProducts/api/types'
import { LeatherColorButton } from 'shared/ui/buttons/leatherColorButton/leatherColorButton'

type PropsType = {
  activeColor: string
  chaneActiveColor: (activeColor: string) => void
  className?: string
  colors: ProductColorType[]
}

const ProductColorsButtons: FC<PropsType> = ({
  className,
  colors,
  activeColor,
  chaneActiveColor,
}) => {
  return (
    <div className={classnames(cls.productColorsButtons, className)}>
      {colors.length > 1 && (
        <div className="flex flex-wrap gap-3">
          {colors.map(color => {
            return (
              <LeatherColorButton
                key={color._id}
                isActive={color._id === activeColor}
                photo={color.photo}
                onClick={() => chaneActiveColor(color._id)}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

const Memo = memo(ProductColorsButtons)

export { Memo as ProductColorsButtons }
