import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { ECost, TCost } from '@/enums/cost'
import { ETheme } from '@/enums/theme'
import { UserStatus } from '@/enums/userStatus'

type UserSettingsStateType = {
  userStatus: UserStatus
  currentCurrency: TCost
  theme: ETheme
}

const initialState: UserSettingsStateType = {
  userStatus: UserStatus.NONE,
  currentCurrency: ECost.BYN,
  theme: ETheme.AUTO,
}

type StoreType = UserSettingsStateType & {
  setCurrentCurrency: (currentCurrency: TCost) => void
  setTheme: (theme: ETheme) => void
  setUserStatus: (userStatus: UserStatus) => void
}

export const useUserSettings = create(
  persist<StoreType>(
    set => ({
      ...initialState,
      setCurrentCurrency: currentCurrency => set({ currentCurrency }),
      setTheme: theme => set({ theme }),
      setUserStatus: userStatus => set({ userStatus }),
    }),
    { name: 'userSettings' }
  )
)
