import { Types } from 'mongoose'

import { BasicProductLeatherEntity } from './basicProductLeather.entity'
import { BasicProductPhotoEntity } from './basicProductPhoto.entity'

import { LocaleFieldEntity } from '@/shared/entities/localeFieldEntity'
import { EPunchPitch } from '@/shared/enums/materials'
import { EProductAssignment, EProductCategory } from '@/shared/enums/product'

export interface BasicProductEntity {
  _id: Types.ObjectId
  assignments: EProductAssignment[]
  category: EProductCategory
  cost: number
  description: LocaleFieldEntity
  isPublished: boolean
  leather: BasicProductLeatherEntity
  photos: Record<string, BasicProductPhotoEntity[]>
  punchPitch: EPunchPitch
  size: LocaleFieldEntity
  title: LocaleFieldEntity
}
