import { create } from 'zustand'

import { LeatherFactoryService } from '@/api/crm/leatherFactoryApi/productsApi'

type Store = {
  leatherFactoryService: LeatherFactoryService
}
export const useSrmServiceStore = create<Store>(() => {
  const leatherFactoryService = new LeatherFactoryService()

  return {
    leatherFactoryService,
  }
})
