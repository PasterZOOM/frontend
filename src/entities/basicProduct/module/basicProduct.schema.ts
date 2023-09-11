import mongoose, { Document } from 'mongoose'

import { BasicProductEntity } from './interfaces/basicProduct.entity'

export const BasicProductSchema = new mongoose.Schema<BasicProductEntity>()

export type BasicProductDocument = BasicProductEntity & Document
