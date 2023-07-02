import { ChangeEvent, FC, useState } from 'react'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Button } from 'components/common/ui/buttons/button'
import { Search } from 'components/common/ui/inputs/search'
import { EFilterKeys } from 'components/pages/catalog/filters/filters'
import { useChangeMultipleQueryParams } from 'hooks/queryParams/useChangeMultipleQueryParams'

export const ProductSearch: FC = () => {
  const [value, setValue] = useState('')
  const { query } = useRouter()
  const { t } = useTranslation('common')
  const { setQueryParams } = useChangeMultipleQueryParams(EFilterKeys.SEARCH, value)

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.currentTarget.value)
  }

  const onButtonClick = (): void => {
    if (query.search !== value) {
      setQueryParams()
    }
  }

  return (
    <div className="flex gap-8">
      <Search value={value} onChange={onChangeValue} />
      <Button className="px-4 py-2" onClick={onButtonClick}>
        {t('search')}
      </Button>
    </div>
  )
}
