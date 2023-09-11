import { FilterQuery, SortOrder } from 'mongoose'

import { BasicProductModel } from './basicProduct.model'
import { BasicProductDocument } from './basicProduct.schema'

import { DEFAULT_PAGE_SIZE } from 'shared/consts/defaultPageSize'
import { ESort } from 'shared/enums/sort'
import { QueryParam } from 'shared/types/queryParam'

export class BasicProductService {
  private basicProductModel

  constructor() {
    this.basicProductModel = BasicProductModel
  }

  async findAll(
    filters: FilterQuery<BasicProductDocument> = {},
    limit: QueryParam = `${DEFAULT_PAGE_SIZE}`,
    skip = 0,
    sort: QueryParam = ESort.NEW_FIRSTS
  ): Promise<BasicProductDocument[]> {
    const [key, value] = sort.toString().split('_') as [string, SortOrder]

    return this.basicProductModel
      .find(filters)
      .limit(+limit)
      .skip(skip)
      .sort({ [key === 'date' ? '_id' : key]: value })
  }

  async countDocuments(filters?: FilterQuery<BasicProductDocument>): Promise<number> {
    return this.basicProductModel.countDocuments(filters).exec()
  }

  async getMinCost(): Promise<number> {
    return (await this.basicProductModel.find().sort({ cost: 1 }).limit(1))[0].cost
  }

  async getMaxCost(): Promise<number> {
    return (await this.basicProductModel.find().sort({ cost: -1 }).limit(1))[0].cost
  }
}
