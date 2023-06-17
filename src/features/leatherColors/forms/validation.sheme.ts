import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Schema } from 'yup'

import { MIN_TITLE_LENGTH, REQUIRED_MESSAGE } from 'constants/forms/validate'
import { ECreateLeatherColorParams } from 'features/leatherColors/enums/paramsKeys'

const validate: Record<ECreateLeatherColorParams, Schema> = {
  title: yup
    .string()
    .required(REQUIRED_MESSAGE)
    .min(MIN_TITLE_LENGTH, 'Должно быть более 6 символов'),
  articleId: yup.string().required(REQUIRED_MESSAGE),
  code: yup
    .string()
    .required(REQUIRED_MESSAGE)
    .matches(/[0-9]/g, { name: 'NaN', message: 'Код должен быть числом' }),
  photo: yup.string().required(REQUIRED_MESSAGE),
  value: yup.string(),
  description: yup.string(),
}

export const resolver = yupResolver(yup.object(validate).required())
