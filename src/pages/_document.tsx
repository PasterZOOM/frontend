import { FC } from 'react'

import { Head, Html, Main, NextScript } from 'next/document'

const Document: FC = () => {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <body className="text-anthracite-gray dark:bg-anthracite-gray dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
