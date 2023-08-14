import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const initialState: AppStoreInitialStateType = {
  isVisible: true,
}

export const useAppStore = create(
  devtools<StoreType>(set => ({
    ...initialState,
    setIsVisible: isVisible => set({ isVisible }),
  }))
)

export const selectIsVisible: IsVisibleSelectorType = store => store.isVisible
export const selectSetIsVisible: SetIsVisibleSelectorType = store => store.setIsVisible

type AppStoreInitialStateType = {
  isVisible: boolean
}
type SetIsVisibleType = (isVisible: boolean) => void

type StoreType = AppStoreInitialStateType & {
  setIsVisible: SetIsVisibleType
}

type IsVisibleSelectorType = (store: StoreType) => boolean
type SetIsVisibleSelectorType = (store: StoreType) => SetIsVisibleType
