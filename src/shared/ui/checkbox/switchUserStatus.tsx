import { FC, useEffect, useState } from 'react'

import { useTranslation } from 'next-i18next'

import { UserStatus } from 'shared/enums/userStatus'
import { selectSetUserStatus, selectUserStatus, useUserSettings } from 'store/useUserSettings'

export const SwitchUserStatus: FC = () => {
  const userStatus = useUserSettings(selectUserStatus)
  const setUserStatus = useUserSettings(selectSetUserStatus)
  const { t } = useTranslation()

  const [checked, setChecked] = useState(userStatus === UserStatus.ADMIN)

  useEffect(() => {
    if (checked) {
      setUserStatus(UserStatus.ADMIN)
    } else {
      setUserStatus(UserStatus.NONE)
    }
  }, [checked, setUserStatus])

  return (
    <label className="cursor-pointer" htmlFor="isAdminCheckbox">
      <span className="m-2">{t('Админ')}</span>
      <input
        checked={checked}
        id="isAdminCheckbox"
        type="checkbox"
        onChange={e => setChecked(e.currentTarget.checked)}
      />
    </label>
  )
}
