import axios from 'axios'

import { EFilterKeys } from '@/mocks/filters'
import { ProductType } from '@/types/productType'

export class ProductsService {
  BASE_URL = 'http://localhost:3000/api'

  getProducts: (filters?: Record<EFilterKeys, string>) => Promise<ProductType[]> =
    async filters => {
      const res = await axios.get(`${this.BASE_URL}/products`, {
        params: {
          assignments: filters?.assignments.length ? filters.assignments : undefined,
          categories: filters?.categories.length ? filters.categories : undefined,
          leatherColors: filters?.leatherColors.length ? filters.leatherColors : undefined,
          leathers: filters?.leathers.length ? filters.leathers : undefined,
        },
      })

      return res.data
    }
}
