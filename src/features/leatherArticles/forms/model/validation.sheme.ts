import { yupResolver } from '@hookform/resolvers/yup'
import { object, string, StringSchema } from 'yup'

import { ECreateLeatherArticleParams } from './paramsKeys'

import { MIN_TITLE_LENGTH, REQUIRED_MESSAGE } from 'shared/constants/forms/validate'

type FormData = Record<ECreateLeatherArticleParams, StringSchema>

const data: FormData = {
  title: string().required(REQUIRED_MESSAGE).min(MIN_TITLE_LENGTH, 'Должно быть более 6 символов'),
  factoryId: string().required(REQUIRED_MESSAGE),
  value: string()
    .required(REQUIRED_MESSAGE)
    .matches(/[a-z]/g, { name: 'letters', message: 'Только латинские буквы в нижнем регистре' }),
  description: string(),
}

export const schema = object(data).required()
export const resolver = yupResolver(schema)
