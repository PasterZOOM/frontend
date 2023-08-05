import { ReactElement } from 'react'

import Header from 'components/common/header/header'

export const MainLayout = (page: ReactElement): ReactElement => {
  return (
    <>
      <Header />
      <div>{page}</div>
    </>
  )
}
