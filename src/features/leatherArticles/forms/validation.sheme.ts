import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Schema } from 'yup'

import { ECreateLeatherArticleParams } from 'features/leatherArticles/enums/paramsKeys'
import { MIN_TITLE_LENGTH, REQUIRED_MESSAGE } from 'shared/constants/forms/validate'

const validate: Record<ECreateLeatherArticleParams, Schema> = {
  title: yup
    .string()
    .required(REQUIRED_MESSAGE)
    .min(MIN_TITLE_LENGTH, 'Должно быть более 6 символов'),
  factoryId: yup.string().required(REQUIRED_MESSAGE),
  value: yup
    .string()
    .required(REQUIRED_MESSAGE)
    .matches(/[a-z]/g, { name: 'letters', message: 'Только латинские буквы в нижнем регистре' }),
  description: yup.string(),
}

export const resolver = yupResolver(yup.object(validate).required())
