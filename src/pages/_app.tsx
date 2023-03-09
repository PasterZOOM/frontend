import '../styles/globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { FC } from 'react'

import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

import Header from '@/components/common/header/header'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div id="modals" />
      <div id="confirmModal" />
      <Header />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default App
