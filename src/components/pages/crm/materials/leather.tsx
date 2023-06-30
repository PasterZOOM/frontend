import { FC } from 'react'

import { TypographyHeader } from 'components/common/ui/typographyHeader/typographyHeader'
import { LeatherArticles } from 'features/leatherArticles/ui/leatherArticles'
import { LeatherColors } from 'features/leatherColors/ui/leatherColors'
import { LeatherFactories } from 'features/leatherFactories/ui/leatherFactories'
import { useRedirect } from 'hooks/useRedirect'

export const Leather: FC = () => {
  useRedirect()

  return (
    <>
      <TypographyHeader className="mb-6 text-center" as="h1">
        Кожа
      </TypographyHeader>

      <div className="flex gap-4">
        <LeatherFactories className="w-full" />

        <LeatherArticles className="w-full" />

        <LeatherColors className="w-full" />
      </div>
    </>
  )
}
