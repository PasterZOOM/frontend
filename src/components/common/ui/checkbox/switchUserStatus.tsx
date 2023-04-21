import { FC, useEffect, useState } from 'react'

import { UserStatus } from 'enums/userStatus'
import { selectSetUserStatus, selectUserStatus, useUserSettings } from 'store/useUserSettings'

export const SwitchUserStatus: FC = () => {
  const userStatus = useUserSettings(selectUserStatus)
  const setUserStatus = useUserSettings(selectSetUserStatus)

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
