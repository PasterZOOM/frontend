import '@/styles/globals.css'
import { FC } from 'react'

import type { AppProps } from 'next/app'

import { useInit } from '@/store/servises'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  useInit()

  return <Component {...pageProps} />
}

export default App
