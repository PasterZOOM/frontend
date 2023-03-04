import '../styles/globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { FC } from 'react'

import type { AppProps } from 'next/app'

import Header from '@/components/common/header/header'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div>
      <div id="modals" />
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

export default App
