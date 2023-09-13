import { model, Model, models } from 'mongoose'

import { LeatherColorDocument, LeatherColorSchema } from './leatherColor.schema'

export const LeatherColorModel: Model<LeatherColorDocument> =
  models.LeatherColor || model<LeatherColorDocument>('LeatherColor', LeatherColorSchema)
