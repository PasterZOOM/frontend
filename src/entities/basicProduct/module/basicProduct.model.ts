import { model, Model, models } from 'mongoose'

import { BasicProductDocument, BasicProductSchema } from './basicProduct.schema'

export const BasicProductModel: Model<BasicProductDocument> =
  models.BasicProduct || model<BasicProductDocument>('BasicProduct', BasicProductSchema)
