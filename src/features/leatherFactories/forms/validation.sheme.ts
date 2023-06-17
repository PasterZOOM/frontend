import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Schema } from 'yup'

import { MIN_TITLE_LENGTH, REQUIRED_MESSAGE } from 'constants/forms/validate'
import { ECreateLeatherFactoryParams } from 'features/leatherFactories/enums/paramsKeys'

const validate: Record<ECreateLeatherFactoryParams, Schema> = {
  title: yup
    .string()
    .required(REQUIRED_MESSAGE)
    .min(MIN_TITLE_LENGTH, 'Должно быть более 6 символов'),
  description: yup.string(),
  country: yup.string(),
}

export const resolver = yupResolver(yup.object(validate).required())