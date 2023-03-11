import '../styles/globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { FC } from 'react'

import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

import Header from '@/components/common/header/header'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

const App: FC<AppProps> = ({ Component, pageProps }) => {
  // const queryClientRef = useRef<QueryClient>()
  //
  // if (!queryClientRef.current) {
  //   queryClientRef.current = new QueryClient({
  //     defaultOptions: { queries: { refetchOnWindowFocus: false } },
  //   })
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <div id="modals" />
        <div id="confirmModal" />
        <Header />
        <Component {...pageProps} />{' '}
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
