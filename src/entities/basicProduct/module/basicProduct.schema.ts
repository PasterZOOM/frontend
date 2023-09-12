import { Document, Schema } from 'mongoose'

import { BasicProductEntity } from './interfaces/basicProduct.entity'

export interface BasicProductDocument extends Omit<Document, '_id'>, BasicProductEntity {}

export const BasicProductSchema = new Schema<BasicProductDocument>()
