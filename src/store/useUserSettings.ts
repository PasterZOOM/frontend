import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { ECost, TCost } from '@/enums/cost'
import { ETheme } from '@/enums/theme'

type UserSettingsStateType = {
  currentCurrency: TCost
  theme: ETheme
}

const initialState: UserSettingsStateType = {
  currentCurrency: ECost.BYN,
  theme: ETheme.AUTO,
}

type Store = UserSettingsStateType & {
  setCurrentCurrency: (currentCurrency: TCost) => void
  setTheme: (theme: ETheme) => void
}

export const useUserSettings = create(
  persist<Store>(
    set => ({
      ...initialState,
      setCurrentCurrency: currentCurrency => set({ currentCurrency }),
      setTheme: theme => set({ theme }),
    }),
    { name: 'userSettings' }
  )
)
