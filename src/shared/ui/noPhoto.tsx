import { FC } from 'react'

import { useTranslation } from 'next-i18next'

export const NoPhoto: FC = () => {
  const { t } = useTranslation('catalog')

  return (
    <div className="flex aspect-square w-full cursor-default items-center justify-center bg-light-gray text-4xl font-bold text-black">
      {t('no-photo')}
    </div>
  )
}
