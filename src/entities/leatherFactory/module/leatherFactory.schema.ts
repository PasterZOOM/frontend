import { Document, Schema } from 'mongoose'

import { LeatherFactoryEntity } from './interfaces/leatherFactory.entity'

export interface LeatherFactoryDocument extends Omit<Document, '_id'>, LeatherFactoryEntity {}

export const LeatherFactorySchema = new Schema<LeatherFactoryDocument>()
