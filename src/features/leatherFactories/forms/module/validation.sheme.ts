import { yupResolver } from '@hookform/resolvers/yup'
import { object, string, StringSchema } from 'yup'

import { ECreateLeatherFactoryParams } from '@/features/leatherFactories/forms/module/paramsKeys'
import { MIN_TITLE_LENGTH, REQUIRED_MESSAGE } from '@/shared/consts/forms/validate'

type FormData = Record<ECreateLeatherFactoryParams, StringSchema>

const formData: FormData = {
  title: string().required(REQUIRED_MESSAGE).min(MIN_TITLE_LENGTH, 'Должно быть более 6 символов'),
  description: string(),
  country: string().required(REQUIRED_MESSAGE),
}

export const schema = object(formData).required()
export const resolver = yupResolver(schema)
