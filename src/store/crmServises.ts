import { create } from 'zustand'

import { BasicProductsService } from '@/features/basicProducts/api/basicProductsService'
import { LeatherArticlesService } from '@/features/leatherArticles/api/leatherArticlesService'
import { LeatherColorsService } from '@/features/leatherColors/api/leatherColorsService'
import { LeatherFactoriesService } from '@/features/leatherFactories/api/leatherFactoriesService'

type StoreType = {
  leatherFactoriesService: LeatherFactoriesService
  leatherArticlesService: LeatherArticlesService
  leatherColorsService: LeatherColorsService
  basicProductsService: BasicProductsService
}
export const useSrmServiceStore = create<StoreType>(() => {
  const leatherFactoriesService = new LeatherFactoriesService()
  const leatherArticlesService = new LeatherArticlesService()
  const leatherColorsService = new LeatherColorsService()
  const basicProductsService = new BasicProductsService()

  return {
    leatherFactoriesService,
    leatherArticlesService,
    leatherColorsService,
    basicProductsService,
  }
})

export const selectLeatherFactoriesService: LeatherFactoriesServiceSelectorType = state =>
  state.leatherFactoriesService
export const selectLeatherArticlesService: LeatherArticlesServiceSelectorType = state =>
  state.leatherArticlesService
export const selectLeatherColorsService: LeatherColorsServiceSelectorType = state =>
  state.leatherColorsService
export const selectBasicProductsService: BasicProductsServiceSelectorType = state =>
  state.basicProductsService

export type LeatherFactoriesServiceSelectorType = (state: StoreType) => LeatherFactoriesService
export type LeatherArticlesServiceSelectorType = (state: StoreType) => LeatherArticlesService
export type LeatherColorsServiceSelectorType = (state: StoreType) => LeatherColorsService
export type BasicProductsServiceSelectorType = (state: StoreType) => BasicProductsService
