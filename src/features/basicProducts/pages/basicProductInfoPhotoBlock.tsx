import { FC, KeyboardEventHandler, useState } from 'react'

import { PropertyPreviewWrapper } from '@/components/common/wrappers/propertyPreviewWrapper'
import { BasicProductType } from '@/features/basicProducts/api/types'
import { useAddBasicProductPhoto } from '@/features/basicProducts/hooks/useAddBasicProductPhoto'
import { useRemoveBasicProductPhoto } from '@/features/basicProducts/hooks/useRemoveBasicProductPhoto'
import { useGetLeatherArticle } from '@/features/leatherArticles/hooks/useGetLeatherArticle'

type PropsType = {
  product: BasicProductType
}

export const BasicProductInfoPhotoBlock: FC<PropsType> = ({ product }) => {
  const { mutate: addBasicProductPhoto } = useAddBasicProductPhoto()
  const { mutateAsync: removeBasicProductPhoto } = useRemoveBasicProductPhoto()

  const leatherArticle = useGetLeatherArticle(product.leather._id)
  const [selectValue, setSelectValue] = useState(leatherArticle?.colors[0]._id || '')
  const [inputValue, setInputValue] = useState('')

  const onEnter: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      addBasicProductPhoto({ _id: product._id, params: { [selectValue]: [inputValue] } })
    }
  }

  return (
    <PropertyPreviewWrapper title="Фото:" childrenClassName="ml-5">
      <select value={selectValue} onChange={e => setSelectValue(e.currentTarget.value)}>
        {leatherArticle?.colors.map(color => (
          <option key={color._id} value={color._id}>
            {color.title}
          </option>
        ))}
      </select>
      <input
        type="text"
        onKeyDown={onEnter}
        value={inputValue}
        onChange={e => setInputValue(e.currentTarget.value)}
      />
      {Object.keys(product.photos).map(key => (
        <div key={key}>
          {product.photos[key] &&
            product.photos[key].map(photo => (
              <div key={photo._id}>
                <span className="mr-2">{photo.url}</span>
                <span
                  className="cursor-pointer border p-1"
                  onClick={() =>
                    removeBasicProductPhoto({ productId: product._id, photoId: photo._id })
                  }
                  aria-hidden="true"
                >
                  X
                </span>
              </div>
            ))}
        </div>
      ))}
    </PropertyPreviewWrapper>
  )
}
