import { create } from 'zustand'

import { LeatherArticlesService } from '@/api/crm/leatherArticlesApi/leatherArticlesApi'
import { LeatherColorsService } from '@/api/crm/leatherColorsApi/leatherColorsApi'
import { LeatherFactoriesService } from '@/api/crm/leatherFactoriesApi/leatherFactoriesApi'

type Store = {
  leatherFactoriesService: LeatherFactoriesService
  leatherArticlesService: LeatherArticlesService
  leatherColorsService: LeatherColorsService
}
export const useSrmServiceStore = create<Store>(() => {
  const leatherFactoriesService = new LeatherFactoriesService()
  const leatherArticlesService = new LeatherArticlesService()
  const leatherColorsService = new LeatherColorsService()

  return {
    leatherFactoriesService,
    leatherArticlesService,
    leatherColorsService,
  }
})
