import { model, Model, models } from 'mongoose'

import { BasicProductDocument, BasicProductSchema } from './basicProduct.schema'

export const BasicProductModel: Model<BasicProductDocument> =
  models.basicproducts || model<BasicProductDocument>('BasicProduct', BasicProductSchema)
