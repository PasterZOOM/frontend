import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { LeatherArticles } from '@/features/leatherArticles/ui/leatherArticles'
import { LeatherColors } from '@/features/leatherColors/ui/leatherColors'
import { LeatherFactories } from '@/features/leatherFactories/ui/leatherFactories'
import { useRedirect } from '@/shared/lib/hooks/useRedirect'
import { TypographyHeader } from '@/shared/ui/typographyHeader/typographyHeader'

export const Leather: FC = () => {
  useRedirect()
  const { t } = useTranslation()

  return (
    <>
      <TypographyHeader as="h1" className="mb-6 text-center">
        {t('Кожа')}
      </TypographyHeader>

      <div className="flex gap-4">
        <LeatherFactories className="w-full" />

        <LeatherArticles className="w-full" />

        <LeatherColors className="w-full" />
      </div>
    </>
  )
}
