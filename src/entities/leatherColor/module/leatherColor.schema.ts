import { Document, Schema } from 'mongoose'

import { LeatherColorEntity } from './interfaces/leatherColor.entity'

export interface LeatherColorDocument extends Omit<Document, '_id'>, LeatherColorEntity {}

export const LeatherColorSchema = new Schema<LeatherColorDocument>()
