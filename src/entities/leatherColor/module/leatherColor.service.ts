import { FilterQuery, ProjectionType, Types } from 'mongoose'

import { LeatherColorEntity } from './interfaces/leatherColor.entity'
import { LeatherColorModel } from './leatherColor.model'
import { LeatherColorDocument } from './leatherColor.schema'

export class LeatherColorService {
  private leatherColorModel

  constructor() {
    this.leatherColorModel = LeatherColorModel
  }

  async findAll(
    filters: FilterQuery<LeatherColorDocument> = {},
    projection: ProjectionType<LeatherColorDocument> | null = null
  ): Promise<LeatherColorEntity[]> {
    return (await this.leatherColorModel.find(filters, projection).sort().exec()).map(color =>
      color.toJSON()
    )
  }

  async findOne(
    id: Types.ObjectId,
    projection: ProjectionType<LeatherColorDocument> | null = null
  ): Promise<LeatherColorEntity | null> {
    const color = await this.leatherColorModel.findById(id, projection)

    return color ? color.toJSON() : null
  }
}
