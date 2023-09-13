import { model, Model, models } from 'mongoose'

import { LeatherArticleDocument, LeatherArticleSchema } from './leatherArticle.schema'

export const LeatherArticleModel: Model<LeatherArticleDocument> =
  models.LeatherArticle || model<LeatherArticleDocument>('LeatherArticle', LeatherArticleSchema)
