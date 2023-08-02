import { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { EFilterKeys } from 'components/pages/catalog/filters/filters'
import { useChangeQueryParams } from 'shared/lib/hooks/queryParams/useChangeQueryParams'
import { Button } from 'shared/ui/buttons/button'
import { selectFilter, useBasicProductsFilterStore } from 'store/useBasicProductsFilterStore'
import { Search } from 'widgets/search'

export const ProductSearch: FC = () => {
  const [value, setValue] = useState('')
  const { query } = useRouter()
  const { t } = useTranslation('common')
  const { changeParam, removeParam } = useChangeQueryParams(EFilterKeys.SEARCH)

  const filter = useBasicProductsFilterStore(selectFilter(EFilterKeys.SEARCH))

  const onSearch = (): void => {
    if (query.search !== value) {
      changeParam(value || undefined)
    }
  }

  const onClear = (): void => {
    setValue('')
    removeParam()
  }

  useEffect(() => {
    if (filter !== value) {
      setValue(filter as string)
    }
    // eslint-disable-next-line
  }, [filter])

  return (
    <div className="flex gap-8">
      <Search value={value} onChangeValue={setValue} onClear={onClear} onKeyEnter={onSearch} />
      <Button className="px-4 py-2" onClick={onSearch}>
        {t('search')}
      </Button>
    </div>
  )
}
