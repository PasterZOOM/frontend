import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { ECost, TCost } from '@/enums/cost'

type UserSettingsStateType = {
  currentCurrency: TCost
}

const initialState: UserSettingsStateType = {
  currentCurrency: ECost.BYN,
}

type Store = UserSettingsStateType & {
  setCurrentCurrency: (currentCurrency: TCost) => void
}

export const useUserSettings = create(
  persist<Store>(
    set => ({
      ...initialState,
      setCurrentCurrency: currentCurrency => set({ currentCurrency }),
    }),
    { name: 'userSettings' }
  )
)
