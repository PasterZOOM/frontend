import { FC, KeyboardEventHandler, useEffect, useState } from 'react'

import { Input } from 'components/common/ui/inputs/input'
import { DefaultSelect } from 'components/common/ui/selects/defaultSelect'
import { PropertyPreviewWrapper } from 'components/common/wrappers/propertyPreviewWrapper'
import { BasicProductType } from 'features/basicProducts/api/types'
import { useAddBasicProductPhoto } from 'features/basicProducts/hooks/useAddBasicProductPhoto'
import { useRemoveBasicProductPhoto } from 'features/basicProducts/hooks/useRemoveBasicProductPhoto'
import { useGetLeatherArticle } from 'features/leatherArticles/hooks/useGetLeatherArticle'

type PropsType = {
  product: BasicProductType
}

export const BasicProductInfoPhotoBlock: FC<PropsType> = ({ product }) => {
  const { mutate: addBasicProductPhoto } = useAddBasicProductPhoto()
  const { mutateAsync: removeBasicProductPhoto } = useRemoveBasicProductPhoto()

  const { data: leatherArticle } = useGetLeatherArticle(product.leather._id)

  const [selectValue, setSelectValue] = useState('')
  const [inputValue, setInputValue] = useState('')

  const onEnter: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      addBasicProductPhoto({ _id: product._id, params: { [selectValue]: [inputValue] } })
    }
  }

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
        <Input
          onKeyDown={onEnter}
          value={inputValue}
          onChange={e => setInputValue(e.currentTarget.value)}
        />
      </div>
      {product.productColors.map(({ _id }) => (
        <div key={_id}>
          {product.photos[_id] && (
            <div>
              <span className="font-bold">
                {leatherArticle?.colors.find(color => color._id === _id)?.title}
              </span>
              {product.photos[_id].map(photo => (
                <div key={photo._id} className="ml-5">
                  <span className="mr-2">{photo.url}</span>
                  <button
                    type="button"
                    className="border px-1"
                    onClick={() =>
                      removeBasicProductPhoto({ productId: product._id, photoId: photo._id })
                    }
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </PropertyPreviewWrapper>
  )
}