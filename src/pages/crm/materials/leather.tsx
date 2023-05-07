import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { H1 } from 'components/common/ui/headers/h1'
import { LeatherArticles } from 'features/leatherArticles/ui/leatherArticles'
import { LeatherColors } from 'features/leatherColors/ui/leatherColors'
import { LeatherFactories } from 'features/leatherFactories/ui/leatherFactories'
import { useRedirect } from 'hooks/useRedirect'
import { CrmLayout } from 'layouts/crmLayout'
import { NextPageWithLayout } from 'pages/_app'

const Leather: NextPageWithLayout = () => {
  useRedirect()

  return (
    <>
      <H1 className="mb-6 text-center">Кожа</H1>

      <div className="flex gap-4">
        <LeatherFactories className="w-full" />

        <LeatherArticles className="w-full" />

        <LeatherColors className="w-full" />
      </div>
    </>
  )
}

Leather.getLayout = CrmLayout

export default Leather

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['common'])),
    },
  }
}
