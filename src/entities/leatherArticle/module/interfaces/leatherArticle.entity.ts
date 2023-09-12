import { Types } from 'mongoose'

import { LocaleFieldEntity } from 'shared/entities/localeFieldEntity'

export interface LeatherArticleEntity {
  _id: Types.ObjectId
  description: LocaleFieldEntity
  factory: Types.ObjectId
  title: LocaleFieldEntity
  value: string
}
