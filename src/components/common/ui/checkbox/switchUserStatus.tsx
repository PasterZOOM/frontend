import { FC, useEffect, useState } from 'react'

import { UserStatus } from '@/enums/userStatus'
import { useUserSettings } from '@/store/useUserSettings'

export const SwitchUserStatus: FC = () => {
  const userStatus = useUserSettings(state => state.userStatus)
  const setUserStatus = useUserSettings(state => state.setUserStatus)

  const [checked, setChecked] = useState(userStatus === UserStatus.ADMIN)

  useEffect(() => {
    if (checked) {
      setUserStatus(UserStatus.ADMIN)
    } else {
      setUserStatus(UserStatus.NONE)
    }
  }, [checked])

  return (
    <label htmlFor="isAdminCheckbox" className="cursor-pointer">
      <span className="m-2">Админ</span>
      <input
        id="isAdminCheckbox"
        type="checkbox"
        checked={checked}
        onChange={e => setChecked(e.currentTarget.checked)}
      />
    </label>
  )
}
