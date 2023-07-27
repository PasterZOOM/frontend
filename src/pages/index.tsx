import { FC, useEffect } from 'react'

import { useRouter } from 'next/router'

const Page: FC = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/catalog').then()
  }, [router]) // TODO: ВОЗМОЖНЫЙ БАГ

  return null
}

export default Page
