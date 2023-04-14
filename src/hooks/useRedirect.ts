import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { UserStatus } from '@/enums/userStatus'
import { selectUserStatus, useUserSettings } from '@/store/useUserSettings'

export const useRedirect: UseRedirectType = () => {
  const router = useRouter()
  const userStatus = useUserSettings(selectUserStatus)

  useEffect(() => {
    ;(async () => {
      if (userStatus !== UserStatus.ADMIN) {
        await router.push('/')
      }
    })()
  }, [])
}

type UseRedirectType = () => void
