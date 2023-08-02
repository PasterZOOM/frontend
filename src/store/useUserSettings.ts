import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { ECost } from 'enums/cost'
import { ETheme } from 'enums/theme'
import { UserStatus } from 'enums/userStatus'
import { LOCALES } from 'types/localeType'

const initialState: UserSettingsStateType = {
  userStatus: UserStatus.NONE,
  currentCurrency: ECost.BYN,
  theme: ETheme.AUTO,
  language: LOCALES.EN,
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

export const selectUserStatus: UserStatusSelectorType = store => store.userStatus
export const selectCurrentCurrency: CurrentCurrencySelectorType = store => store.currentCurrency
export const selectTheme: ThemeSelectorType = store => store.theme
export const selectSetUserStatus: SetUserStatusSelectorType = store => store.setUserStatus
export const selectSetCurrentCurrency: SetCurrentCurrencySelectorType = store =>
  store.setCurrentCurrency
export const selectSetTheme: SetThemeSelectorType = store => store.setTheme

type SetCurrentCurrencyType = (currentCurrency: ECost) => void
type SetThemeType = (theme: ETheme) => void
type SetUserStatusType = (userStatus: UserStatus) => void

type UserSettingsActionsType = {
  setCurrentCurrency: SetCurrentCurrencyType
  setTheme: SetThemeType
  setUserStatus: SetUserStatusType
}
type UserSettingsStateType = {
  currentCurrency: ECost
  language: LOCALES
  theme: ETheme
  userStatus: UserStatus
}

type StoreType = UserSettingsActionsType & UserSettingsStateType

type UserStatusSelectorType = (store: StoreType) => UserStatus
type CurrentCurrencySelectorType = (store: StoreType) => ECost
type ThemeSelectorType = (store: StoreType) => ETheme
type SetUserStatusSelectorType = (store: StoreType) => SetUserStatusType
type SetCurrentCurrencySelectorType = (store: StoreType) => SetCurrentCurrencyType
type SetThemeSelectorType = (store: StoreType) => SetThemeType
