import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { NextPageWithLayout } from '@/pages/_app'
import { useRedirect } from '@/shared/lib/hooks/useRedirect'
import { TypographyHeader } from '@/shared/ui/typographyHeader/typographyHeader'
import { CrmLayout } from '@/widgets/layouts/crmLayout'

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
