import { create } from 'zustand'

import { LeatherArticlesService } from '@/api/crm/leatherArticlesApi/leatherArticlesApi'
import { LeatherFactoryService } from '@/api/crm/leatherFactoryApi/leatherFactoryApi'

type Store = {
  leatherFactoryService: LeatherFactoryService
  leatherArticlesService: LeatherArticlesService
}
export const useSrmServiceStore = create<Store>(() => {
  const leatherFactoryService = new LeatherFactoryService()
  const leatherArticlesService = new LeatherArticlesService()

  return {
    leatherFactoryService,
    leatherArticlesService,
  }
})
