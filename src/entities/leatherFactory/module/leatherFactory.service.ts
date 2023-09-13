import { FilterQuery, ProjectionType, Types } from 'mongoose'

import { LeatherFactoryEntity } from './interfaces/leatherFactory.entity'
import { LeatherFactoryModel } from './leatherFactory.model'
import { LeatherFactoryDocument } from './leatherFactory.schema'

export class LeatherFactoryService {
  private leatherFactoryModel

  constructor() {
    this.leatherFactoryModel = LeatherFactoryModel
  }

  async findAll(
    filters: FilterQuery<LeatherFactoryDocument> = {},
    projection: ProjectionType<LeatherFactoryDocument> | null = null
  ): Promise<LeatherFactoryEntity[]> {
    return (await this.leatherFactoryModel.find(filters, projection).sort().exec()).map(factory =>
      factory.toJSON()
    )
  }

  async findOne(
    id: Types.ObjectId,
    projection: ProjectionType<LeatherFactoryDocument> | null = null
  ): Promise<LeatherFactoryEntity | null> {
    const factory = await this.leatherFactoryModel.findById(id, projection)

    return factory ? factory.toJSON() : null
  }
}
