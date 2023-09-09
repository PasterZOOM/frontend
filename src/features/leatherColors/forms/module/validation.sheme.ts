import { yupResolver } from '@hookform/resolvers/yup'
import { object, string, StringSchema } from 'yup'

import { ECreateLeatherColorParams } from 'features/leatherColors/forms/module/paramsKeys'
import { MIN_TITLE_LENGTH, REQUIRED_MESSAGE } from 'shared/constants/forms/validate'

type FormData = Record<ECreateLeatherColorParams, StringSchema>

const data: FormData = {
  title: string().required(REQUIRED_MESSAGE).min(MIN_TITLE_LENGTH, 'Должно быть более 6 символов'),
  articleId: string().required(REQUIRED_MESSAGE),
  code: string()
    .required(REQUIRED_MESSAGE)
    .matches(/[0-9]/g, { name: 'NaN', message: 'Код должен быть числом' }),
  photo: string().required(REQUIRED_MESSAGE),
  value: string().required(REQUIRED_MESSAGE),
  description: string(),
}

export const schema = object(data).required()
export const resolver = yupResolver(schema)
