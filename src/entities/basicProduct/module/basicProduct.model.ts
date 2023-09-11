import mongoose, { Model } from 'mongoose'

import { BasicProductSchema } from './basicProduct.schema'
import { BasicProductEntity } from './interfaces/basicProduct.entity'

export const BasicProductModel: Model<BasicProductEntity> =
  mongoose.models.basicproducts ||
  mongoose.model<BasicProductEntity>('BasicProduct', BasicProductSchema)
