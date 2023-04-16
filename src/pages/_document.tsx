import { FC } from 'react'

import { Head, Html, Main, NextScript } from 'next/document'

const Document: FC = () => {
  return (
    <Html lang="en">
      <Head />
      <body className="text-anthracite-gray dark:bg-anthracite-gray dark:text-white">
        <div id="modals" />
        <div id="confirmModal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
