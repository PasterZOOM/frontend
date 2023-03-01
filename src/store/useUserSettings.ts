import { create } from 'zustand'

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

export const useUserSettings = create<Store>(set => ({
  ...initialState,
  setCurrentCurrency: currentCurrency => set({ currentCurrency }),
}))
