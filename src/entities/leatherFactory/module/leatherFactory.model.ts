import { model, Model, models } from 'mongoose'

import { LeatherFactoryDocument, LeatherFactorySchema } from './leatherFactory.schema'

export const LeatherFactoryModel: Model<LeatherFactoryDocument> =
  models.leatherfactory || model<LeatherFactoryDocument>('LeatherFactory', LeatherFactorySchema)
