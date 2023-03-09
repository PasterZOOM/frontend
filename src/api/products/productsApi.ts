import axios from 'axios'

import { EFilterKeys } from '@/mocks/filters'
import { ProductType } from '@/types/productType'

export class ProductsService {
  BASE_URL = 'http://localhost:8001'

  getProducts: (filters?: Record<EFilterKeys, string>) => Promise<ProductType[]> =
    async filters => {
      const assignments = filters?.assignments.length ? filters.assignments.split(',') : undefined
      const categories = filters?.categories.length ? filters.categories.split(',') : undefined
      const leatherColors = filters?.leatherColors.length
        ? filters.leatherColors.split(',')
        : undefined
      const leathers = filters?.leathers.length ? filters.leathers.split(',') : undefined

      const res = await axios.get(`${this.BASE_URL}/basic-products`, {
        params: { assignments, categories, leatherColors, leathers },
      })

      return res.data
    }
}
