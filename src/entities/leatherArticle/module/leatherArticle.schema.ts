import { Document, Schema } from 'mongoose'

import { LeatherArticleEntity } from './interfaces/leatherArticle.entity'

export interface LeatherArticleDocument extends Omit<Document, '_id'>, LeatherArticleEntity {}

export const LeatherArticleSchema = new Schema<LeatherArticleDocument>()
