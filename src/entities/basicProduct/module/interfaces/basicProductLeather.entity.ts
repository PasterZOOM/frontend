import { Types } from 'mongoose'

export interface BasicProductLeatherEntity {
  article: Types.ObjectId
  factory: Types.ObjectId
}
