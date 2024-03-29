import { FC, KeyboardEventHandler, useCallback, useEffect, useState } from 'react'

import { BasicProductType } from '@/features/basicProducts/api/types'
import { useAddBasicProductPhoto } from '@/features/basicProducts/hooks/useAddBasicProductPhoto'
import { useRemoveBasicProductPhoto } from '@/features/basicProducts/hooks/useRemoveBasicProductPhoto'
import { BasicProductPhoto } from '@/features/basicProducts/ui/basicProductPhoto'
import { useGetLeatherArticle } from '@/features/leatherArticles/hooks/useGetLeatherArticle'
import { PropertyPreviewWrapper } from '@/shared/components/common/wrappers/propertyPreviewWrapper'
import { Input } from '@/shared/ui/inputs/input'
import { DefaultSelect } from '@/shared/ui/selects/defaultSelect'

type PropsType = {
  product: BasicProductType
}

export const BasicProductInfoPhotoBlock: FC<PropsType> = ({ product }) => {
  const { mutate: addBasicProductPhoto } = useAddBasicProductPhoto()
  const { mutateAsync: removeBasicProductPhoto } = useRemoveBasicProductPhoto()

  const { data: leatherArticle } = useGetLeatherArticle(product.leather.article._id)

  const [selectValue, setSelectValue] = useState('')
  const [inputValue, setInputValue] = useState('')

  const onEnter: KeyboardEventHandler = useCallback(
    e => {
      if (e.key === 'Enter') {
        addBasicProductPhoto({ _id: product._id, data: { [selectValue]: [inputValue] } })
      }
    },
    [addBasicProductPhoto, product._id, selectValue, inputValue]
  )

  useEffect(() => {
    if (leatherArticle) {
      setSelectValue(leatherArticle.colors[0]?._id)
    }
  }, [leatherArticle])

  return (
    <PropertyPreviewWrapper title="Фото:">
      <div className="flex gap-2">
        <DefaultSelect value={selectValue} onChange={e => setSelectValue(e.currentTarget.value)}>
          {leatherArticle?.colors.map(color => (
            <option key={color._id} value={color._id}>
              {color.title}
            </option>
          ))}
        </DefaultSelect>
        <Input value={inputValue} onChangeValue={setInputValue} onKeyDown={onEnter} />
      </div>
      {product.productColors.map(({ _id }) => (
        <div key={_id}>
          {product.photos && product.photos[_id] && (
            <div>
              <span className="font-bold">
                {leatherArticle?.colors.find(color => color._id === _id)?.title}
              </span>
              <div className="flex flex-wrap gap-4">
                {product.photos[_id].map(photo => (
                  <BasicProductPhoto
                    key={photo._id}
                    photo={photo}
                    productId={product._id}
                    removeBasicProductPhoto={removeBasicProductPhoto}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </PropertyPreviewWrapper>
  )
}
