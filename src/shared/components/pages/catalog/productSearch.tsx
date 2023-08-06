import { FC, useEffect, useState } from 'react'

import { useTranslation } from 'next-i18next'

import { EFilterKeys } from 'shared/components/pages/catalog/filters/filters'
import { useChangeQueryParams } from 'shared/lib/hooks/queryParams/useChangeQueryParams'
import { Button } from 'shared/ui/buttons/button'
import { Search } from 'widgets/search'

export const ProductSearch: FC = () => {
  const [value, setValue] = useState('')
  const { t } = useTranslation('common')
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
      <Search value={value} onChangeValue={setValue} onClear={onClear} onKeyEnter={onSearch} />
      <Button className="px-4 py-2" onClick={onSearch}>
        {t('search')}
      </Button>
    </div>
  )
}
