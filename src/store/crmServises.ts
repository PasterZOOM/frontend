import { create } from 'zustand'

import { BasicProductsService } from '@/api/crm/basicProductsApi/basicProductsService'
import { LeatherArticlesService } from '@/api/crm/leatherArticlesApi/leatherArticlesService'
import { LeatherColorsService } from '@/api/crm/leatherColorsApi/leatherColorsService'
import { LeatherFactoriesService } from '@/api/crm/leatherFactoriesApi/leatherFactoriesService'

type Store = {
  leatherFactoriesService: LeatherFactoriesService
  leatherArticlesService: LeatherArticlesService
  leatherColorsService: LeatherColorsService
  basicProductsService: BasicProductsService
}
export const useSrmServiceStore = create<Store>(() => {
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
