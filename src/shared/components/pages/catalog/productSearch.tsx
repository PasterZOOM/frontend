import { FC, useEffect, useState } from 'react'

import { useTranslation } from 'next-i18next'

import { EFilterKeys } from 'shared/components/pages/catalog/filters/filters'
import { useChangeQueryParams } from 'shared/lib/hooks/queryParams/useChangeQueryParams'
import { Button } from 'shared/ui/buttons/button'
import { CatalogSearch } from 'widgets/catalogSearch'

export const ProductSearch: FC = () => {
  const [value, setValue] = useState('')
  const { t } = useTranslation('catalog')
  const { changeParam, removeParam, queryParam } = useChangeQueryParams(EFilterKeys.SEARCH)

  const onSearch = (): void => {
    if (queryParam !== value) {
      changeParam(value || undefined)
    }
  }

  const onClear = (): void => {
    setValue('')
    removeParam()
  }

  useEffect(() => {
    setValue([queryParam].flat()[0] || '')
  }, [queryParam])

  return (
    <div className="flex gap-8">
      <CatalogSearch
        value={value}
        onChangeValue={setValue}
        onClear={onClear}
        onKeyEnter={onSearch}
      />
      <Button className="px-4 py-2" onClick={onSearch}>
        {t('Search button')}
      </Button>
    </div>
  )
}
