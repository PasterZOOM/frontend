import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TypographyHeader } from 'components/common/ui/typographyHeader/typographyHeader'
import { useRedirect } from 'hooks/useRedirect'
import { CrmLayout } from 'layouts/crmLayout'
import { NextPageWithLayout } from 'pages/_app'

const Threads: NextPageWithLayout = () => {
  useRedirect()
  const { t } = useTranslation()

  return (
    <TypographyHeader as="h1" className="text-center">
      {t('Нитки')}
    </TypographyHeader>
  )
}

Threads.getLayout = CrmLayout

export default Threads

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['common'])),
    },
  }
}
