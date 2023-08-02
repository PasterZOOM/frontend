import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { UserStatus } from 'shared/enums/userStatus'
import { selectUserStatus, useUserSettings } from 'store/useUserSettings'

export const useRedirect: UseRedirectType = () => {
  const router = useRouter()
  const userStatus = useUserSettings(selectUserStatus)

  useEffect(() => {
    ;(async () => {
      if (userStatus !== UserStatus.ADMIN) {
        await router.push('/')
      }
    })()
  }, [router, userStatus]) // TODO: ВОЗМОЖНЫЙ БАГ
}

type UseRedirectType = () => void
