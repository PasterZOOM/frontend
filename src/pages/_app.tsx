import '../styles/globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { FC } from 'react'

import type { AppProps } from 'next/app'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <div id="modals" />
      <Component {...pageProps} />
    </>
  )
}

export default App
