import { ReactElement, useState } from 'react'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import '../styles/globals.css'
import { useVisible } from 'shared/lib/hooks/useVisible'

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout): ReactElement => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      })
  )
  const getLayout = Component.getLayout ?? (page => page)

  useVisible()

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default appWithTranslation(App)
