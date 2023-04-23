import '../styles/globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ReactElement, useState } from 'react'

import { DevSupport } from '@react-buddy/ide-toolbox-next'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { ComponentPreviews, useInitial } from 'index'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => JSX.Element
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout): JSX.Element => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      })
  )
  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <Hydrate state={pageProps.dehydratedState}>
        <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
          <Component {...pageProps} />
        </DevSupport>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default appWithTranslation(App)
