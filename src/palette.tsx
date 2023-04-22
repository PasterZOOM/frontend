import { FC } from 'react'

import { Category, Component, Palette, Variant } from '@react-buddy/ide-toolbox-next'

import { Button } from 'components/common/ui/buttons/button'
import { ProductCard } from 'components/pages/catalog/productCard/productCard'
import { ECost } from 'enums/cost'
import { EPunchPitch } from 'enums/materials'
import { EProductAssignment, EProductCategory } from 'enums/product'

export const PaletteTree: FC = () => (
  <Palette>
    <Category name="components">
      <Component name="Button">
        <Variant name="Button">
          <Button>Hello World</Button>
        </Variant>
      </Component>
      <Component name="ProductCard">
        <Variant name="ProductCard">
          <ProductCard
            product={{
              assignments: [EProductAssignment.FOR_CARDS, EProductAssignment.FOR_CASH],
              category: EProductCategory.CARD_HOLDER,
              cost: 20,
              costCurrency: ECost.USD,
              description: '',
              isPublished: false,
              leather: { _id: '6429f6c9149dcf6bbdf3e775', title: 'Buttero' },
              photos: {},
              punchPitch: EPunchPitch.LARGE,
              size: '',
              title: 'Холдер из кожи Buttero',
              _id: '6442e310d11b11f28bd48c64',
            }}
          />
        </Variant>
      </Component>
    </Category>
  </Palette>
)
