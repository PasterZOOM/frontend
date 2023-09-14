import { ReactElement } from 'react'

import Header from '@/shared/components/common/header/header'

export const MainLayout = (page: ReactElement): ReactElement => {
  return (
    <>
      <Header />
      <div>{page}</div>
    </>
  )
}
