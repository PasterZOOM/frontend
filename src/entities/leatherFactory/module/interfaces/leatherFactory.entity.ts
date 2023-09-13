import { Types } from 'mongoose'

import { LocaleFieldEntity } from 'shared/entities/localeFieldEntity'
import { ECountry } from 'shared/enums/country'

export interface LeatherFactoryEntity {
  _id: Types.ObjectId
  country: ECountry
  description: LocaleFieldEntity
  title: LocaleFieldEntity
}
