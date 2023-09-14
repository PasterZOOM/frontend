import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { selectUserStatus, useUserSettings } from '@/store/useUserSettings'
import { UserStatus } from '@/widgets/switchers/userStatusSwitcher/module/enum'

export const useRedirect: UseRedirectType = () => {
  const router = useRouter()
  const userStatus = useUserSettings(selectUserStatus)

  useEffect(() => {
    ;(async () => {
      if (userStatus !== UserStatus.ADMIN) {
        await router.push('/')
      }
    })()
  }, [router, userStatus])
}

type UseRedirectType = () => void
